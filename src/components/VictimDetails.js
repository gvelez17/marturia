import React, { useRef, useEffect } from 'react';
import './ViewComponent.scss';

const VictimDetails = (props) => {

	return (
		<div className='details-container'>
			<p> Nationality: </p>
			<p> Health Status </p>
			<p> Health Issues </p>
			<p> Languages Spoken</p>
			<p> Profession </p>
			<p> About the Victim </p>
			<p> Additional Information </p>
		</div>
	)
}

export default VictimDetails
