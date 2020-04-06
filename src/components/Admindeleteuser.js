import React, {useRef, useEffect, useState} from 'react';
import './Admin.scss';

const DeleteUser = (props) => {
	const [user, setUser] = useState('');

	const deleteUser = (user) => {
		if(user === '') {
			return;
		}

		let headers = {
			'Authorization': 'Bearer ' + localStorage.getItem('token')
		}

		fetch(process.env.REACT_APP_API_BASE + 'users/' + user, {
			method: 'DELETE',
			headers: headers
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
			if(data.status === 404) {
				//user not found
				alert('user does not exist')
			} else if(data.status === 400) {
				//params error
				alert('params error')
			} else if(data.status === 200) {
				//user deleted
				alert('user successfully deleted')
			} else {
				alert('something went wrong')
			}
		})
		.catch(err => console.log(err))
	}

	return (
		<div className='admin-container-wrapper'>
		  <button
		 	  className='back-button'
			  onClick={() => props.setDisplay('menu')}> Back to Menu </button>
		  <div className='admin-delete-container'>
			  <label htmlFor='del'> User ID </label>
			  <input
				  name='del'
				  onChange={(e) => setUser(e.target.value)}
				  />
			  <button onClick={() => deleteUser(user)}> Delete User </button>
		  </div>
		</div>
	)
}

export default DeleteUser
