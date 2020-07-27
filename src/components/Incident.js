import React from 'react';
import { Link } from "react-router-dom";
import IncidentItem from '../components/IncidentItem';
import {tokenIsStillValid} from '../utils/utils';

import './ViewComponent.scss';

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
	const editUrl="/editincidents/"+props.victimId
	return (
		<div>
		  {tokenIsStillValid() && <Link to={editUrl} target="_blank">Edit Incidents</Link>}
		<div className='incident-container'>		
		{incidentItems}			
		</div>
		</div>
	)
}

export default Incident
