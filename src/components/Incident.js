import React, { useRef, useEffect } from 'react';
import './ViewComponent.scss';
import IncidentItem from '../components/IncidentItem';

const Incident = (props) => {

	if(!props.data)
		return (
		<div className='incident-container'>
			<p> Loading ... </p>
		</div>
		)

	const incidentItems = props.data.map ( (incident) => 
		<IncidentItem key={incident.ID} data={incident}/>
	)
	return (
		<div className='incident-container'>
		{incidentItems}
			
		</div>
	)
}

export default Incident
