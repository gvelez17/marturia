import React, {useState} from 'react';
import ViewUser from './Viewuser';
import Popup from 'reactjs-popup';
import {authorizationHeaders} from '../actions/headers';
import './Admin.scss';

const LookupUser = (props) => {

	const [user, setUser] = useState('');
	const [userData, setUserData] = useState(null);
	const [isOpen, setIsOpen] = useState(false);

	const fetchUser = (user) => {
		setUserData(null);

		fetch(process.env.REACT_APP_API_BASE + 'users?iduser=' + user, {
			method: 'GET',
			headers: authorizationHeaders()
		})
		.then(res => res.json())
		.then(data => {
			if(data.status === 400) {
				//params error
				alert('params error');
			} else if(data.status === 200) {
				//got the data
				setUserData(data.user);
				setIsOpen(true);
			} else if(data.status === 404){
				//user does not exist
				alert('user does not exist');
			} else if(data.status === 403){
				//forbidden
				alert('access forbidden');
			} else {
				alert('somethign went wrong');
			}
		})
		.catch(err => console.log(err))
	}

	let userView = (
		<p> </p>
	)

	if(userData != null) {
		userView = (
			<div className='popup'>
				<p className='close-button' onClick={() => setIsOpen(false)}>
        	&times;
      	</p>
				<ViewUser
					key={userData.ID}
					ID={userData.ID}
					name={userData.name}
					email={userData.email}
					phone={userData.phone}
					user_role={userData.user_role}
					CreatedAt={userData.CreatedAt}
					UpdatedAt={userData.UpdatedAt}
					DeletedAt={userData.DeletedAt}
				/>
		</div>
		)
	}

	let content = (
		<div className='admin-container-wrapper'>
		  <button onClick={() => props.setDisplay('menu')}> Back to Menu </button>
		  <div className='admin-view-container'>
				<label htmlFor='id'> User ID </label>
				<br/>
			  <input
					name='id'
				  onChange={(e) => setUser(e.target.value)}
				  placeholder='Enter User ID'
			  />
				<br/>
			  <button onClick={() => fetchUser(user)}> View User </button>
		  </div>
		  <Popup
			  contentStyle={{width: '400px', borderRadius: '4px'}}
			  open={isOpen}
			  onClose={() => setIsOpen(false)}
		  >
			  {userView}
		  </Popup>
		</div>
	)

	return content;
}

export default LookupUser
