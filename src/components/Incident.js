import React, { useRef, useEffect } from 'react';
import './ViewComponent.scss';

const Incident = (props) => {


	return (
		<div className='incident-container'>
			<div className='incident-top'>
				<b> Date of Incident: </b>
				<p> Location: </p>
				<p> Disappearance: </p>
				<p> Direct Testimony: </p>
				<p> Discovery: </p>
			</div>
			<div>
				<p> Narrative of Incident: </p>
				<p> Current Status Summary: </p>
			</div>
		</div>
	)
}

export default Incident
