import React, { useRef, useEffect } from 'react';
import './ViewComponent.scss';
import langs from '../data/languages.js';

const VictimDetails = (props) => {

	if(!props.data)
		return (
		<div className='details-container'>
			<p> Loading ... </p>
		</div>
		)
	//console.log(props)
	//alert(props.data[0].languages_spoken)
	let language = langs.filter(lang => lang.code === props.data[0].languagues_spoken);
	//alert(language[0].code);
	
	return (
		<div className='details-container'>
			       {/* <p> Nationality </p>*/}
			<p> Health Status: {props.data[0].health_status} </p>
			<p> Health Issues: {props.data[0].health_issues}  </p>
			<p> Languages Spoken: {language && language[0] && language[0].name}	</p>			
			<p> Profession: {props.data[0].profession}</p>
			<p> About the Victim: {props.data[0].about_the_victim} </p>
			<p> Additional Information: {props.data[0].additional_information} </p>
		</div>
	)
}

export default VictimDetails
