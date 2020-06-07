import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import {Motion, spring} from 'react-motion';
import './ViewComponent.scss';

const ViewItem = (props) => {

	const handleClick = () => {
		let newShown = {}
		Object.assign(newShown, props.shown)
		newShown[props.category] = !props.shown[props.category]
	 	props.setShown(newShown)
	}

	let info;
	let caret;
	if(props.shown[props.category]) {
		info = (
			<Motion
				defaultStyle={{opacity: 0, height: 0}}
				style={{opacity: spring(1), height: spring(document.getElementById(props.category).clientHeight)}}>
				{style => (
					<div style={{opacity: style.opacity, height: style.height}} name={props.category}>
						{props.info}
					</div>
				)}
			</Motion>
		)

		caret = (
			<FontAwesomeIcon
				icon={faCaretUp}
				onClick={handleClick}/>
		)
	} else {
		caret = (
			<FontAwesomeIcon
				icon={faCaretDown}
				onClick={handleClick}/>
		)
	}

	return (
		<div className='view-item'>
			<div className='view-title'>
			  <span className='view-item-title'> {props.category} </span>
				<span>
					{caret}
				</span>
			</div>
			{info}
		</div>
	)
}

export default ViewItem
