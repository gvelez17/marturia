import React, { useRef, useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { useForm } from 'react-hook-form';
import MainLayout from '../components/MainLayout';
import IncidentForm from '../components/IncidentForm';
import './Submit.scss';
import langs from '../data/languages.js';
import {authContentTypeHeaders} from '../actions/headers'
import {constructReportObj, handleFileObject, uploadProfilePhoto} from '../actions/submit'
import data from '../data/countries.json';
import statuses from '../data/status.json';
import healthStatuses from '../data/health_status.json';

const filterAllStatus = (array) => {
    const index = array.indexOf("All");
	let filteredArray = array.slice();
	filteredArray.splice(index, 1);
	return filteredArray;
};
const statusWithoutAll = filterAllStatus(statuses.status);

const Submit = (props) => {


  const nameRef = useRef();
  const { register, trigger, errors, getValues, handleSubmit } = useForm({
	   defaultValues: {
    country: "",
	language:""
  
  }})
  
	const [photoUploaded, setPhotoUploaded] = useState(false)
	const [documentsUploaded, setDocumentsUploaded] = useState(false)
	const [incidentFilesUploaded, setIncidentFilesUploaded] = useState(false)
	
    //state variables to record whether modal component is shown and which popup message to display
    const [warningShown, setWarningShown] = useState(false)
    const [showModal, setShowModal] = useState(false)
	const [submitting, setSubmitting] = useState(false)

	const [victimID, setVictimID] = useState(-1)


const RedirectToView = () => {
	props.history.push('/view/'+victimID)
}

const SuccessModal = () => {
  return (
  <Popup modal closeOnDocumentClick	onClose={RedirectToView} open={photoUploaded && documentsUploaded && incidentFilesUploaded}>
      <div className="modal">
            Successfully submitted a victim <br/>
			You will be redirected to the stored profile
			<a className="close" onClick={RedirectToView} >
              &times;
            </a>
	   </div>
  </Popup>
  )
}

const WarningModal = () => {
  return (
        <Popup modal closeOnDocumentClick open={warningShown && !submitting && !photoUploaded && !documentsUploaded && !incidentFilesUploaded}>
          <div className="modal">            
			<p>Warning! Very private information should not be uploaded but sent via more secure channels</p>            
			<button className="button" onClick={toggleWarningShown} >
              Cancel
            </button>
            <button className="button" onClick={handleSubmit(handleFormSubmit)} >
              Continue to Submit
            </button>
          </div>
        </Popup>
)}

const SendingModal = () => {
  return (
  <Popup modal closeOnDocumentClick	open={submitting && (!photoUploaded || !documentsUploaded  || !incidentFilesUploaded) }>
      <div className="modal">
            Submitting ...
	   </div>
  </Popup>
  )
}
  //function to switch boolean value of state(warningShown)
  const toggleWarningShown = () => {
    setWarningShown(!warningShown)
    console.log('warningShown is now', warningShown)
  }

  //function to switch boolean value of state(showModal)
  const toggleShowModal = () => {
    setShowModal(!showModal)
    console.log('showModal is now', showModal)
  }
  
 async function showWarning () {
	 await trigger() // only submit if no validation error
	 if(Object.keys(errors).length===0)
	 {
		toggleWarningShown()

	 }
 }
 
 


  const decreaseDocumentUploadingCount = (counter) =>{	  
	  counter.count -= 1
	  if(counter.count<1)
		  setDocumentsUploaded(true)	  
	  console.log("document upload counter:"+counter.count)	 
  }
  
  const decreaseIncidentFilesUploadingCount = (counter) =>{	  
	  counter.count -= 1
	  if(counter.count<1)
		  setIncidentFilesUploaded(true)	  
	  console.log("incident files upload counter:"+counter.count)
  }
  
  const handleFormSubmit = (form) => {
	  setSubmitting(true)
	  let reportObj = constructReportObj(form)
	  fetch(process.env.REACT_APP_API_BASE + 'reports', {
		  method: "POST",
		  headers: authContentTypeHeaders(),
		  body: JSON.stringify(reportObj)
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)			
			if(data.status === 400) {
				//invalid request
				alert('invalid request')
			} else if(data.status === 201) {
				console.log(form.photo, form.documents)
				//now add the photos
								
				uploadProfilePhoto(form.photo, data.victim.ID, ()=>setPhotoUploaded(true))
				
				let documentCount = form.documents?form.documents.length:0
				if(documentCount===0)
					setDocumentsUploaded(true)
				else
					handleFileObject(data.victim.ID, form.documents, "documents", decreaseDocumentUploadingCount, {"count": documentCount })
				
				let incidentFileCount = form.incident_files?form.incident_files.length:0
				if(incidentFileCount===0)
					setIncidentFilesUploaded(true)
				else
					handleFileObject(data.victim.Incident[0].ID, form.incident_files, "incidents", decreaseIncidentFilesUploadingCount, {"count": incidentFileCount })
				//report created, want to redirect to success screens
				setVictimID(data.victim.ID)				
			} else {
				alert('something went wrong')
			}
		})
		.catch(err => console.log(err))
  }

  useEffect(() => {
    document.title = 'Submit Testimony - Testimony Database'
		nameRef.current.focus()		
  }, [])

  return (
    <MainLayout>
      <div className="submit page">
        <div className="wrapper">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <section>
              <h1>Your information</h1>					
              <div className="row">
                <label htmlFor="name">Name*</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  ref={(input) => {
                    register(input, { required: true });
                    nameRef.current = input;
                  }}
                />
                {errors.name &&
                  <p className="error">Name is required</p>}
              </div>
              <div className="row">
                <label htmlFor="email">Email*</label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  ref={register({ required: true })}
                />
                {errors.email &&
                  <p className="error">Email is required</p>}
              </div>
              <div className="row">
                <label htmlFor="discovery">Discovery*</label>
                <textarea
                  id="discovery"
                  name="discovery"
                  placeholder="How you learned about the victim's status."
                  ref={register({ required: true })}
                />
                {errors.discovery &&
                  <p className="error">Discovery is required</p>}
              </div>
              <div className="row radio">
                <label>Is this your testimony?*</label>
                <div className="radio-buttons">
                  <label className="radio-label">
                    <input
                      name="own_testimony"
                      type="radio"
                      value="yes"
                      ref={register({ required: true })}
                    />
                    <span>Yes</span>
                  </label>
                  <label className="radio-label">
                    <input
                      name="own_testimony"
                      type="radio"
                      value="no"
                      defaultChecked
                      ref={register({ required: true })}
                    />
                    <span>No</span>
                  </label>
                </div>
                {errors.own_testimony &&
                  <p className="error radio">This field is required</p>}
              </div>
            </section>
            <section>
              <h1>Victim's information</h1>
              <div className="row">
                <label htmlFor="victim_name">Name*</label>
                <input
                  id="victim_name"
                  name="victim_name"
                  type="text"
                  ref={register({ required: true })}
                />
                {errors.victim_name &&
                  <p className="error">Victim's name is required</p>}
              </div>
			   <div className="row">
                <label htmlFor="victim_name">Legal Name</label>
                <input
                  id="legal_name"
                  name="legal_name"
                  type="text"
                  ref={register({ required: false })}
                />
              </div>
			  <div className="row">
                <label htmlFor="victim_name">Aliases</label>
                <input
                  id="aliases"
                  name="aliases"
                  type="text"
                  ref={register({ required: false })}
                />
              </div>
			  <div className="row">
                <label htmlFor="gender">Gender*</label>
                <input
                  id="gender"
                  name="gender"
                  ref={register({ required: true })}
				  />
				  {errors.gender &&
                  <p className="error">Gender is required</p>}
              </div>
			  <div className="row">
                <label htmlFor="gender">Place of Birth</label>
                <input
                  id="place_of_birth"
                  name="place_of_birth"
                  ref={register({ required: false })}
                />
              </div>
			<div className="row">
                <label htmlFor="birth_date">Date of Birth*</label>
                <input type="date"
											 id="birth_date"
											 name="birth_date"
											 ref={register({ required: true })}/>
                {errors.birth_date &&
                  <p className="error">Birth Date is required</p>}
              </div>
              <div className="row">
                <label htmlFor="about">About*</label>
                <textarea
                  id="about"
                  name="about"
                  placeholder="Short biography of the victim, including place of birth, ethnicity, age or age range, and profession, if known."
                  ref={register({ required: true })}
                />
                {errors.about &&
                  <p className="error">About is required</p>}
              </div>

               <div className="row">
                <label htmlFor="country">Country of Origin*</label>
                <select defaultValue="none"
												id="country"
												name="country"
												ref={register({ required: true })}>

                {data.countries.map(item => (
                  <option
                    key={item.country}
                    value={item.country}>
                    {item.country}
                  </option>
                ))}
              </select>
							{errors.country &&
								<p className="error">Country of Origin is required</p>}
              </div>
			   <div className="row">
			  				<label htmlFor="language">Language*</label>
                <select
								  id="language"
								  name="language"
								  ref={register({ required: true })}>
                  {langs.map((item) => (
                  <option
                    key={item.code + item.name}
                    value={item.code}>
                    {item.name}
                  </option>
                ))}
                </select>
					{errors.language &&
								<p className="error">Language is required</p>}
              </div>
			   <div className="row">
                <label htmlFor="profession">Profession</label>
                <input
                  id="profession"
                  name="profession"
                  type="text"
                  ref={(input) => {
                    register(input, { required: false });
                  }}
                />
              </div>
			  <div className="row">
                <label htmlFor="detainment_date">Last Seen Date*</label>
                <input type="date"
											 id="detainment_date"
											 name="detainment_date"
											 ref={register({ required: true })}/>
                {errors.detainment_date &&
                  <p className="error">Last Seen Date is required</p>}
              </div>
              <div className="row">
                <label htmlFor="detainment_location">Last Seen Place*</label>
                <textarea
                  id="detainment_location"
                  name="detainment_location"
                  placeholder="Location where victim was seen the last time.  Enter unknown if you don't know."
                  ref={register({ required: true })}
                />
							{errors.detainment_location &&
								<p className="error">Last Seen Place is required</p>}
              </div>
              <div className="row">
                <label htmlFor="location">Current Location</label>
                <textarea
                  id="location"
                  name="location"
                  placeholder="Where the victim is now. Enter unknown, if you don't know."
                  ref={register({ required: false })}
                />
							{errors.location &&
								<p className="error">Current location is required</p>}
              </div>
              <div className="row">
                <label htmlFor="status">Current Status*</label>
								<select
									id='status'
									name='status'
									ref={register({ required: true })}>
								<option
									key={'sel'}
									value='All'>
									Select Status
								</option>
								{statusWithoutAll.map(item => (
									<option
										key={item}
										value={item}>
										{item}
									</option>
								))}
								</select>
							{errors.status &&
								<p className="error">Status is required</p>}
              </div>
			  <div className="row">
                <label htmlFor="status">Health Status*</label>
								<select
									id='health_status'
									name='health_status'
									ref={register({ required: true })}>
								<option
									key={'sel'}
									value='All'>
									Select Status
								</option>
								{healthStatuses.status.map(item => (
									<option
										key={item}
										value={item}>
										{item}
									</option>
								))}
								</select>
							{errors.health_status &&
								<p className="error">Health Status is required</p>}
              </div>
			   <div className="row">
                <label htmlFor="health_issues">Health Issues</label>
                <textarea
                  id="health_issues"
                  name="health_issues"
                  placeholder="List known health issues of the victim."
				  ref={register({ required: false })}
                />
              </div>
              <div className="row">
                <label htmlFor="additional">Additional Information</label>
                <textarea
                  id="additional"
                  name="additional"
                  placeholder="Any additional information including links to video testimonies, news articles or videos."
				  ref={register({ required: false })}
                />
              </div>
              <div className="row">
                <label htmlFor="photo">Victim's Photo*</label>
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  accept="image/jpg,image/jpeg,image/png,image/gif"
									ref={register({ required: true })}
                />
				 {errors.photo &&
                  <p className="error">Photo is required</p>}
              </div>
              <div className="row">
                <label htmlFor="documents">
                  Documents that prove victim's identity or situation
                </label>
                <input
                  id="documents"
                  name="documents"
                  type="file"
                  accept="image/jpg,image/jpeg,image/png,image/gif,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.oasis.opendocument.text,application/pdf"
                  multiple
									ref={register({ required: false })}
                />
              </div>
			 <IncidentForm register={register} errors={errors} trigger={trigger} getValues={getValues}/>
              <div className="row">
                <button type="button" className="btn" onClick={showWarning}>Submit</button>
              </div>
            </section>
          </form>
		  <WarningModal />
		  <SuccessModal />
		  <SendingModal />
        </div>
      </div>
    </MainLayout>


  );
};

export default Submit;
