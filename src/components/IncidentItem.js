import React, { useEffect, useState } from 'react';
import './ViewComponent.scss';
import VictimMedia from '../components/VictimMedia';
import langs from '../data/languages.js';
import {authContentTypeHeaders} from '../actions/headers'

const IncidentItem = (props) => {

	const [incTranslations, setIncTranslations] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [medias, setMedias] = useState(null);
	
	
	useEffect(() => {
		
		fetch(process.env.REACT_APP_API_BASE + 'incident-translations?idincident=' + String(props.data.ID))
		.then(res => res.json())
		.then(data => {
			if(data.status === 200) {
				console.log(data)				
				setIncTranslations(data.translations)
				setIsLoaded(true);
			} else if(data.status === 400) {
				//params error
			} else {
				//something went wrong
			}
		})
		.catch(err => console.log(err))
		
		fetch(process.env.REACT_APP_API_BASE + 'incident-medias?idincident=' + String(props.data.ID), {
		  headers: authContentTypeHeaders()
		})
		.then(res => res.json())
		.then(data => {
			if(data.status === 200) {
				//console.log(data)
				setMedias(data.medias)
			} else if(data.status === 400) {
				//params error
			} else {
				//something went wrong
			}
		})
		.catch(err => console.log(err))
	}, [])


	let content = (
		<div className='incident-container'>
			<p> Loading ... </p>
		</div>)


	
	if(isLoaded)
	{
		const incTranslationDivs = incTranslations.map( (incTrans) => 
			
			<div key={incTrans.ID} className='incident-top'>
				<p> Language: {langs.filter(lang => lang.code === incTrans.language)[0].name} </p>
				<p> Narrative of Incident: {incTrans.narrative_of_incident} </p>
{/*				<p> Current Status Summary: {incTrans.current_status_summary}</p>*/}
			</div>
			)
		content =  (
		<div>
			<div>
				<p> <b>Incident ID #{props.data.ID}</b> </p>
				<p> Date of Incident: {props.data.date_of_incident}</p>
				<p> Location: {props.data.location} </p>
{/*				<p> Disappearance: {props.data.is_disappearance}</p>
				<p> Direct Testimony: </p>
				<p> Discovery: </p> */}
			</div>
			{incTranslationDivs}
			<VictimMedia data={medias}/>
			<hr/>
		</div>	
		)
	}
	return content
}



export default IncidentItem
