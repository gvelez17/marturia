import React from 'react';



const IsImage = (fileName) => {		
	return 	fileName.includes(".jpeg") || fileName.includes(".JPEG") ||
			fileName.includes(".jpg") || fileName.includes(".JPG") ||
			fileName.includes(".gif") || fileName.includes(".GIF") ||
			fileName.includes(".png") || fileName.includes(".PNG") 
}

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
				  <div key={index} className='sidebar-pic'>
					  {IsImage(value.mediaurl) && 
					   <img className="photo"
	                    src={value.mediaurl}
	                    alt="victim"
	                  />
					  }
					  {!IsImage(value.mediaurl) && 
					   <a href={value.mediaurl}>{value.mediaurl}</a>
					  }
				</div>)
		
		})}
		
		</div>
	)
}

export default VictimMedia
