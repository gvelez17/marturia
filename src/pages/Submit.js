import React, { useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import MainLayout from '../components/MainLayout';
import './Submit.scss';
import langs from '../data/languages.js';
import {contentTypeHeaders, authContentTypeHeaders} from '../actions/headers'
import {getISOfromDatepicker} from '../utils/utils'

import data from '../data/countries.json';

const Submit = () => {
  const nameRef = useRef();
  const { register, handleSubmit, errors } = useForm()

  const handleFormSubmit = (form) => {
		let reportObj = constructReportObj(form)

	  fetch(process.env.REACT_APP_API_BASE + 'reports', {
		  method: "POST",
		  headers: contentTypeHeaders(),
		  body: JSON.stringify(reportObj)
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
			if(data.status === 400) {
				//invalid request
				alert('invalid request')
			} else if(data.status === 201) {
				//report created, want to redirect to success screens
				submitVictimTranslation(reportObj.VictimTranslation[0], data.victim.ID)
				submitIncident(reportObj.Incident[0], data.victim.ID)
			} else {
				//something went wrong
				alert('something went wrong')
			}
		})
		.catch(err => console.log(err))
  };

	const submitMedia = (fileObj, id) => {
	}

	const submitVictimTranslation = (victimTranslationObj, id) => {
		fetch(process.env.REACT_APP_API_BASE + 'victims/' + String(id) + '/victim-translations', {
			method: "POST",
			headers: authContentTypeHeaders(),
			body: JSON.stringify(victimTranslationObj)
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
		})
		.catch(err => console.log(err))
	}

	const submitIncident = (incidentObj, id) => {
		fetch(process.env.REACT_APP_API_BASE + 'victims/' + String(id) + '/incidents', {
			method: "POST",
			headers: authContentTypeHeaders(),
			body: JSON.stringify(incidentObj)
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
		})
		.catch(err => console.log(err))
	}

  const constructReportObj = (data) => {
		if (data.photo.length !== 0) {
			submitMedia(data.photo, data.victim.ID)
		}
		if (data.documents.length !== 0) {
			submitMedia(data.documents, data.victim.ID)
		}

	  let victimTranslationObj = {
		  "language": data.language,
		  "gender": data.gender,
		  "nationality": data.country,
		  "current_status": data.status,
		  "languagues_spoken": data.language
	  }

	  let incidentTranslationObj = {
		  "language": data.language,
		  "narrative_of_incident": data.detainment
	  }
	  console.log(data)
	  let incidentObj = {
		  "date_of_incident": getISOfromDatepicker(data.detainment_date),
		  "location": data.detainment_location,
		  //"is_disappearance": data.,
		  "is_direct_testimony": (data.own_testimony === 'yes'),
		  "discovery": data.discovery,
		  "IncidentTranslation": [incidentTranslationObj]
	  }

	  let reportObj = {
		  "name": data.victim_name,
			"current_status": data.status,
			"gender": data.gender,
			"country": data.country,
			"date_of_birth": getISOfromDatepicker(data.birth_date),
		  "last_seen_place": data.detainment_location,
		  "VictimTranslation": [victimTranslationObj],
		  "Incident": [incidentObj]
	  }
	  return reportObj
  }

  useEffect(() => {
    document.title = 'Submit Testimony - Testimony Database';
    nameRef.current.focus();
  }, []);

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
			  <div className="row">
			  	<label htmlFor="language"> Language </label>
                <select
				  id="language"
				  name="language"
				  ref={register}>
                  <option value="none"
				    defaultValue>
                    Select your language
                  </option>
                  {langs.map((item) => (
                  <option
                    key={item.code + item.name}
                    value={item.code}>
                    {item.name}
                  </option>
                ))}
                </select>
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
                <label htmlFor="gender">Gender</label>
                <input
                  id="gender"
                  name="gender"
                  ref={register({ required: true })}
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
                <label htmlFor="detainment_date">Date of Detainment*</label>
                <input type="date"
											 id="detainment_date"
											 name="detainment_date"
											 ref={register({ required: true })}/>
                {errors.detainment_date &&
                  <p className="error">Detainment Date is required</p>}
              </div>
              <div className="row">
                <label htmlFor="detainment">Detainment*</label>
                <textarea
                  id="detainment"
                  name="detainment"
                  placeholder="Information about when the victim was detained. Approximate dates are allowed."
                  ref={register({ required: true })}
                />
                {errors.detainment &&
                  <p className="error">Detainment is required</p>}
              </div>
              <div className="row">
                <label htmlFor="reason_for_detainment">Reason for Detainment</label>
                <textarea
                  id="reason_for_detainment"
                  name="reason_for_detainment"
                  placeholder="Official or probable reason."
                  ref={register}
                />
              </div>
               <div className="row">
                <label htmlFor="country">Country of Origin</label>
                <select defaultValue="none"
												id="country"
												name="country"
												ref={register}>
                  <option value="none" disabled hidden>
                    Select a country
                  </option>
                {data.countries.map(item => (
                  <option
                    key={item.country}
                    value={item.country}>
                    {item.country}
                  </option>
                ))}
              </select>
              </div>
              <div className="row">
                <label htmlFor="detainment_location">Location of Detainment</label>
                <textarea
                  id="detainment_location"
                  name="detainment_location"
                  placeholder="Location where victim  was detained.  Enter unknown if you don't know."
                  ref={register}
                />
              </div>
              <div className="row">
                <label htmlFor="location">Current Location</label>
                <textarea
                  id="location"
                  name="location"
                  placeholder="Where the victim is now. Enter unknown, if you don't know."
                  ref={register}
                />
              </div>
              <div className="row">
                <label htmlFor="status">Current Status</label>
                <textarea
                  id="status"
                  name="status"
                  placeholder="Any information about the victim's current status. Key terms include disappeared, imprisoned, labor camp, released, emigrated, deceased."
                  ref={register}
                />
              </div>
              <div className="row">
                <label htmlFor="additional">Additional Information</label>
                <textarea
                  id="additional"
                  name="additional"
                  placeholder="Any additional information including links to video testimonies, news articles or videos."
                  ref={register}
                />
              </div>
              <div className="row">
                <label htmlFor="photo">Victim's Photo</label>
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  accept="image/*"
                  ref={register}
                />
              </div>
              <div className="row">
                <label htmlFor="documents">
                  Documents that prove victim's identity or situation
                </label>
                <input
                  id="documents"
                  name="documents"
                  type="file"
                  accept="image/*,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  multiple
                  ref={register}
                />
              </div>
              <div className="row">
                <button type="submit" className="btn">Submit</button>
              </div>
            </section>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Submit;
