import React, {useState} from 'react';
import {authorizationHeaders} from '../actions/headers';
import './Admin.scss';

const DeleteUser = (props) => {
	const [user, setUser] = useState('');

	const deleteUser = (user) => {
		if(user === '') {
			return;
		}

		fetch(process.env.REACT_APP_API_BASE + 'users/' + user, {
			method: 'DELETE',
			headers: authorizationHeaders()
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
			} else if (data.status === 403) {
				//forbidden
				alert('access forbidden');
			}else {
				alert('something went wrong')
			}
		})
		.catch(err => console.log(err))
	}

	return (
		<div className='admin-container-wrapper'>
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
