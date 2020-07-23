import React, { useRef, useEffect } from 'react';

const VictimMedia = (props) => {

	if(!props.data)
		return (
		<div className='medias-container'>
			<p> Loading ... </p>
		</div>
		)
	
	
	return (
		<div className='medias-container'>
	
		{props.data.map((value, index) => {
			return (
				  <div className='sidebar-pic'>
					   <img className="photo"
	                    src={value.mediaurl}
	                    alt="victim"
	                  />
				</div>)
		
		})}
		
		</div>
	)
}

export default VictimMedia
