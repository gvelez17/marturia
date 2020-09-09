import React, { useEffect, useState } from 'react';

import DataTable from 'react-data-table-component';
import Popup from 'reactjs-popup';
import {handleFileObject} from '../actions/submit'
import {authContentTypeHeaders,authorizationHeaders} from '../actions/headers'
import {convertIncidentRestToFormData, constructIncidentObj, constructIncidentTranslationObj} from '../actions/submit'



const Incident = (props) => {

	

//	let incidents = props.incidents
//	let incidentData = props.incident_data
	let errors = props.errors
	let register = props.register
	let trigger = props.trigger
	let getValues = props.getValues
	
		
	const createIncidentObj = () => {
		return {
			"date_of_incident": null,
			"incident_location": '',
			"is_disappearance": false,
			"incident_narrative": '',
			"incident_media": ''
		}
	}
	
	
	const [incidents, setIncidents] = useState([0])
	const [incidentsData, setIncidentsData] = useState({0: createIncidentObj()	})	
	
	const [isLoaded, setIsLoaded] = useState(false)
	const [isEditMode, setIsEditMode] = useState(false)	
	const [saveState, setSaveState] = useState([])
		
	const [reloadToggle, setReloadToggle] = useState(false);
	const [selectedRows, setSelectedRows] = useState([]);		
	const [toggleClearRows, setToggleClearRows] = useState(false);
	const [showDeletePopup, setShowDeletePopup] = useState(false);

	const [incidentFilesUploaded, setIncidentFilesUploaded] = useState(false)	

	
	const checkAllUpdatesDone = (updateDoneMap) => {
		const arr = Array.from(updateDoneMap.values())
		const alldone = arr.filter(value => value===false).length===0
		//console.log("alldone: "+alldone)
		// if all update calls have returned reload data from backend to update table
		if(alldone)
		{
			setToggleClearRows(!toggleClearRows)
			setReloadToggle(!reloadToggle)
		}
	}
	async function finishQuery (incidentDatas) {
		setIncidentsData(incidentDatas)
		setIsLoaded(true)
	}

	async function fetchMedias (incidentDatas) {
		for (let a=0; a<incidentDatas.length; a++)
		{		
			let incident = incidentDatas[a]
			try
			{			
				const response = await fetch(process.env.REACT_APP_API_BASE + 'incident-medias?idincident=' + incident.ID, {  headers: authContentTypeHeaders()})
				const res = await response.json()
				if(res.status === 200) {
					//console.log(data)
					incident.medias = res.medias
				} else if(res.status === 400) {
					//params error
				} else {
					//something went wrong
				}
			}
			catch(err)
			{
			console.log(err)
			}
		}
		return incidentDatas
	}
	
			
    async function loadIncidents() {
	try
	{
	  const response = await fetch(process.env.REACT_APP_API_BASE + 'incidents?idvictim=' + String(props.victimId) , { headers: authContentTypeHeaders()})
	  const res = await response.json()
	  if(res.status === 200)  {
		console.log(res)
		return res.incidents
	  } 
  	  else {
		alert('something went wrong')
		return []
	  }
	}
	catch(err)
	{
	console.log(err)
	}}
		
  
	async function loadIncidentTranslations(incident)  {	  
	try
	{
	  const response = await fetch(process.env.REACT_APP_API_BASE + 'incident-translations?idincident=' + incident.ID)
	  const res = await response.json()
	  if(res.status === 200)  {
		console.log(res)
		incident.IncidentTranslation=res.translations
				
				
	  } 
	  else {
				alert('something went wrong')
	  }
	}
	catch(err)
	{
	console.log(err)
	}}
    

  async function loadAllIncidentTranslations(incidentsDataTmp) {  
		//incidentsDataTmp.forEach(idata => {loadIncidentTranslations(idata)})
		for (let a=0; a<incidentsDataTmp.length; a++)
		{
			
			await loadIncidentTranslations(incidentsDataTmp[a])
		}
		
		let incidentsDataConverted = convertIncidentRestToFormData(incidentsDataTmp)
		let incidentArr = []
		for (let i=0; i<incidentsDataConverted.length; i++)
		{
			incidentArr[i]=i
		}
		setIncidents(incidentArr)
		return incidentsDataConverted
  }
  
  const updateSaveState = (ID,val)  => {
	  let newSaveState=[...saveState]
	  newSaveState[ID]=val
	  setSaveState(newSaveState)	  	 
  }
 
 const updateTranslationID = (index, newID) => {
	// why is incidentsData not an array ??
	let newObj = Object.assign({}, incidentsData)
	newObj[index].translationID = newID
	setIncidentsData(newObj)
 }
 
 const updateIncidentID = (index, newID) => {
	// why is incidentsData not an array ??
	let newObj = Object.assign({}, incidentsData)
	newObj[index].ID = newID
	setIncidentsData(newObj)				
 }

  const sendAddIncident = (formData, index, stateFieldId) => {	
	let incidentObj = constructIncidentObj(formData,null)
	// need both date and location to create the incident
	if(!incidentObj.date_of_incident || !incidentObj.location)
		return

		
	fetch(process.env.REACT_APP_API_BASE + 'victims/' + String(props.victimId)+"/incidents", {
		method: "POST",
		headers: authContentTypeHeaders(),
		body: JSON.stringify(incidentObj)
	})
	.then(res => res.json())
	.then(data => {			
			if(data.status === 201)
			{
				updateSaveState(stateFieldId,"saved")							
				updateIncidentID(index, data.incident.ID)
			}
			else			
				updateSaveState(stateFieldId,"error")
												
			setTimeout(() => updateSaveState(stateFieldId,null), 3000);
		})
		
	.catch(err => console.log(err))
}  
  
  
  const sendUpdateIncident = (formData, stateFieldId) => {	
	let incidentObj = constructIncidentObj(formData,null)
		
	fetch(process.env.REACT_APP_API_BASE + 'incidents/' + String(formData.ID), {
		method: "PUT",
		headers: authContentTypeHeaders(),
		body: JSON.stringify(incidentObj)
	})
	.then(res => res.json())
	.then(data => {			
			if(data.status === 200) 													
				updateSaveState(stateFieldId,"saved")							
			else			
				updateSaveState(stateFieldId,"error")
												
			setTimeout(() => updateSaveState(stateFieldId,null), 3000);
		})
		
	.catch(err => console.log(err))
}

 const sendDeleteIncident = (formData, stateFieldId) => {	
	let incidentObj = constructIncidentObj(formData,null)
		
	fetch(process.env.REACT_APP_API_BASE + 'incidents/' + String(formData.ID), {
		method: "DELETE",
		headers: authContentTypeHeaders(),
		body: JSON.stringify(incidentObj)
	})
	.then(res => res.json())
	
	.catch(err => console.log(err))
}


  const sendAddIncidentTranslation = (formData, index, stateFieldId) => {	
	let incidentTransObj = constructIncidentTranslationObj(formData)
	
	
	
	fetch(process.env.REACT_APP_API_BASE + 'incidents/' + String(formData.ID)+'/incident-translations', {
		method: "POST",
		headers: authContentTypeHeaders(),
		body: JSON.stringify(incidentTransObj)
	})
	.then(res => res.json())
	.then(data => {						
			if(data.status === 201) 					
			{				
				updateSaveState(stateFieldId,"saved")							
				updateTranslationID(index, data.incident_translation.ID)
				
			}
			else			
				updateSaveState(stateFieldId,"error")
												
			setTimeout(() => updateSaveState(stateFieldId,null), 3000);
		})
	
	.catch(err => console.log(err))
}

  const sendUpdateIncidentTranslation = (formData, stateFieldId) => {	
	let incidentTransObj = constructIncidentTranslationObj(formData)
		
	fetch(process.env.REACT_APP_API_BASE + 'incident-translations/' + String(formData.translationID), {
		method: "PUT",
		headers: authContentTypeHeaders(),
		body: JSON.stringify(incidentTransObj)
	})
	.then(res => res.json())
	.then(data => {			
			if(data.status === 200) 													
				updateSaveState(stateFieldId,"saved")							
			else			
				updateSaveState(stateFieldId,"error")
												
			setTimeout(() => updateSaveState(stateFieldId,null), 3000);
		})
	
	.catch(err => console.log(err))
}

	const deleteMediaUrl = (media,updateDoneMap) => {
		media.updated=false
		fetch(process.env.REACT_APP_API_BASE + 'incident-medias/'+media.ID, {
			method: 'DELETE',
			headers: authorizationHeaders()
		})
		.then(res => res.json())
		.then(data => {
			updateDoneMap.set(media.ID,true)
			checkAllUpdatesDone(updateDoneMap)
			if(data.status === 400) {
				//params error				
			} else if(data.status === 200) {
				//got the data			
			} else if(data.status === 403){
				//access forbidden
				
			} else {
				//something went wrong
				
			}
		})
		.catch(err => console.log(err))
	}
  
  useEffect(() => {
	setIsEditMode(props.editMode)
	if(props.editMode)
	{
		loadIncidents().then(loadAllIncidentTranslations).then(fetchMedias).then(finishQuery)
	}
  }, [reloadToggle])
 
	const addIncident = (e) => {
		e.preventDefault()
		let newObj = Object.assign({}, incidentsData)
		if(incidents.length === 0) {
			newObj[0] = createIncidentObj()
			setIncidentsData(newObj)
			return setIncidents([0])
		}
		let newIndex = incidents[incidents.length - 1] + 1
		newObj[newIndex] = createIncidentObj()
		setIncidentsData(newObj)
		setIncidents([...incidents, newIndex])
	}

	const deleteIncident = (e, index) => {
		e.preventDefault()
		let newObj = Object.assign({}, incidentsData)
		delete newObj[index]
		setIncidentsData(newObj)
		setIncidents([...incidents.filter((val => val !== index))])
		
		sendIncidentDelete(e, index)
	}

	const handleChange = (e, index) => {
		let newObj = Object.assign({}, incidentsData)
		newObj[index][e.target.name] = e.target.value
		setIncidentsData(newObj)
		
		updateSaveState(e.target.id,"edited")							
			
	}
	
	const sendIncidentChange = (e,index) => {	
		if(isEditMode && saveState[e.target.id]==="edited")		
		{
			if(incidentsData[index].ID)
				sendUpdateIncident(incidentsData[index], e.target.id)					
			else
			{
				sendAddIncident(incidentsData[index], index, e.target.id)					
			}
		}
	}
	
    const decreaseIncidentFilesUploadingCount = (counter) =>{	  
	  counter.count -= 1
	  if(counter.count<1)
	  {
		  setIncidentFilesUploaded(true)	  
		  setReloadToggle(!reloadToggle)
	  }
	  console.log("incident files upload counter:"+counter.count)
	}

	const sendIncidentFiles = (e,index) => {	
		if(isEditMode)		
		{
			let incidentFileCount = e.target.files.length
			if(incidentFileCount===0)
				setIncidentFilesUploaded(true)
			else
				handleFileObject(incidentsData[index].ID, e.target.files, "incidents", decreaseIncidentFilesUploadingCount, {"count": incidentFileCount })
		}
	}
	
	
	const sendIncidentDelete = (e,index) => {	
		if(isEditMode && incidentsData[index].ID)		
			sendDeleteIncident(incidentsData[index], e.target.id)					
	}
	
	const sendIncidentTranslationChange = (e,index) => {	
		if(isEditMode && saveState[e.target.id]==="edited")
		{
			if(incidentsData[index].translationID)
				sendUpdateIncidentTranslation(incidentsData[index], e.target.id)
			else
				sendAddIncidentTranslation(incidentsData[index], index, e.target.id)					
		}
	}

    let content = (
			<div>
				<p> loading data .... </p>
			</div>
		)
		
	const getSaveStateLabel = (id) => 	{
		let div = ""
		if(saveState[id]==="saved")
		//if(testState===true)
			div =  <div className='success' >Saved !</div>
		else if(saveState[id]==="error")
		//else if(testState===false)
			div =  <div className='error'>Error !</div>
		return div
	}
	const columns = [ 		
		{
			name:'ID',
			selector:'ID',
			sortable:true,
			width:'10%'
		},
		{
			name:'Incident URL',
			selector:'mediaurl',
			sortable:true,
			wrap: true,
			cell: row => <div className='mediaTableDiv'><a>{row.mediaurl}<div><img src={row.mediaurl.replace('.jpg','_thumb.jpg').replace('.JPG','_thumb.JPG').replace('.png','_thumb.png').replace('.PNG','_thumb.PNG').replace('.jpeg','_thumb.jpeg').replace('.JPEG','_thumb.JPEG').replace('.gif','_thumb.gif').replace('.GIF','_thumb.GIF')}/></div></a></div>
		}
	 ]
	 
	const customStyles = {
	  headCells: {
		style: {
		  fontSize: '14px',
		  fontWeight: 'bold',
		},
	  },  
	}
	const updateState = (state) => {
		setSelectedRows(state.selectedRows)
	}
	const deleteURLs = () => {
		let updateDoneMap = new Map()
		selectedRows.forEach( sr => updateDoneMap.set(sr.ID,false))
		selectedRows.forEach( sr => deleteMediaUrl(sr,updateDoneMap))
		setShowDeletePopup(false)
	}
    const clickBtnDelete = (e) => {
		e.preventDefault()
		setShowDeletePopup(true)
	}

	const deletePopup = () => {
		return (
		 <Popup open={showDeletePopup} modal>
			{close => (
			  <div className="modal">
				<a className="close" onClick={close}>
				  &times;
				</a>
				<div className="header"> Delete Incident URLs </div>
				<div className="content">
					Do you really want to delete {selectedRows.length} incident URLs ?		
				</div>
				<div className="actions">				  
					<button className="button" onClick={()=> {
						deleteURLs();close()
						}}> Yes </button>			 				
				  <button
					className="button"
					onClick={() => {              
					  close();
					}}
				  >
					close modal
				  </button>
				</div>
			  </div>
			)}
		  </Popup> )
		}
	const deletePopupInstance = deletePopup();
		
	if(isLoaded || !props.editMode)
	content= (
	
	 <div>
							<h1> Incidents </h1>				
							{incidents.map(item => (					
								<div
									key={item}>
									<div className='row'>									
										{props.editMode && 
										<button
											onClick={(e) => deleteIncident(e, item)}
											className='incident-delete-button'>
											Delete Incident </button>
										}

										<label htmlFor="incident_date">Date of Incident*</label> 
										{getSaveStateLabel('date_of_incident'+String(item))}
										<input
											type="date"
											id={"date_of_incident" +String(item)}
											name={"date_of_incident"}
											value={incidentsData[item]['date_of_incident'] || (getValues && getValues('date_of_incident'))}
											onChange={(e) => handleChange(e, item)}
											onBlur={(e) => sendIncidentChange(e, item)}
										  ref={register({ required: true })}/>
										{errors.incident_date &&
											<p className="error">Date is required</p>}
									</div>
									<div className='row'>
										<label htmlFor='incident_location'> Incident Location* </label> 
										{getSaveStateLabel('incident_location'+String(item))}
										<input
											id={"incident_location"+String(item)}
											name={"incident_location"}
											value={incidentsData[item]['incident_location'] || (getValues && getValues('incident_location'))}
											onChange={(e) => handleChange(e, item)}
											onBlur={(e) => sendIncidentChange(e, item)}
											placeholder="Location of the incident."
											ref={register({ required: true })}/>
										{errors.incident_location &&
											<p className="error">Location is required</p>}
									</div>
									<div className='row'>
										<label htmlFor='incident_narrative'> Incident Narrative*</label>
										{getSaveStateLabel('incident_narrative'+String(item))}
										<textarea
											id={"incident_narrative"+String(item)}
											name={"incident_narrative"}
											value={incidentsData[item]['incident_narrative'] || (getValues && getValues('incident_narrative'))}
											onChange={(e) => handleChange(e, item)}
											onBlur={(e) => sendIncidentTranslationChange(e, item)}
											placeholder="Narrative of the incident."
											ref={register({ required: true })}/>
										{errors.incident_narrative &&
											<p className="error">Narrative is required</p>}
									</div>
									
									<div className="row">
										<label htmlFor="incident_files">
										{getSaveStateLabel('incident_files'+String(item))}
										  Photos / Videos of the Incident
										</label>
										<input
										  id="incident_files"
										  name="incident_files"
										  type="file"
										  accept="image/jpg,image/jpeg,image/png,image/gif,video/mpeg,video/mp4,video/3gpp"
										  onChange={(e) => sendIncidentFiles(e, item)}
										  multiple
										  ref={register({ required: false })}
										/>
									  </div>
								{props.editMode &&
								<div className="row">
									<label htmlFor="incident_files_table">
										  Remove Files
										</label>
								 	<DataTable 
										data={incidentsData[item].medias} 
										columns={columns} 
										selectableRows 										
										onSelectedRowsChange={updateState}
										customStyles={customStyles}
										clearSelectedRows={toggleClearRows}
									 />
									 <button className="btn-left" onClick={(e) =>clickBtnDelete(e) }> Delete Incident URLs </button>
									 {deletePopupInstance}
									
									</div>
								}
									
									<div className='row'>
										<label htmlFor='incident_media'> Additional Media</label>
										<textarea
											id={"incident_media"}
											name={"incident_media"}
											value={incidentsData[item]['incident_media']  || (getValues && getValues('incident_media'))}
											onChange={(e) => handleChange(e, item)}											
											placeholder="Images or videos relating to the incident."
											ref={register({ required: false })}/>
									</div>
								</div>
							))}							
							{props.editMode && 
							<div className='row'>
								<button onClick={(e) => addIncident(e)} className='btn-left'> Add Incident </button>
							</div>
							}
		
				</div>		
	)
	return content
}

export default Incident
