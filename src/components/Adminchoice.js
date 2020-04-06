import React from 'react';
import './Admin.scss';

const AdminChoice = (props) => {
	return (
		<div
		  className='admin-choice-container'
			onClick={props.handleClick}>
			<p> {props.text} </p>
		</div>
	)
}

export default AdminChoice
