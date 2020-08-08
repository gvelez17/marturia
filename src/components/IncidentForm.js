import React, { useEffect, useState } from 'react';


import {authContentTypeHeaders} from '../actions/headers'
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
		setIncidentsData(incidentsDataConverted)
		setIsLoaded(true)
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
  
  useEffect(() => {
	setIsEditMode(props.editMode)
	if(props.editMode)
		loadIncidents().then(loadAllIncidentTranslations)
  }, [])
 
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
