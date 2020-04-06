import React, {useEffect, useState} from 'react';
import ViewUser from './Viewuser';
import {authorizationHeaders} from '../actions/headers';
import './Admin.scss';

const ViewAllUsers = (props) => {
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchUserData = (user) => {
		fetch(process.env.REACT_APP_API_BASE + 'users', {
			method: 'GET',
			headers: authorizationHeaders()
		})
		.then(res => res.json())
		.then(data => {
			setIsLoading(false);
			if(data.status === 400) {
				//params error
				alert('params error');
			} else if(data.status === 200) {
				//got the data
				setUsers(data.users);
			} else if(data.status === 403){
				//access forbidden
				alert('access forbidden');
			} else {
				//something went wrong
				alert('something went wrong');
			}
		})
		.catch(err => console.log(err))
	}

	useEffect(() => {
		if(props.user === 'all') {
			fetchUserData(null);
		} else {
			fetchUserData(props.user);
		}
	}, [])

	let content = (
		<div className='admin-container'>
		<div className='view-users-container'>
			<button onClick={() => props.setDisplay('menu')}> Back to Menu </button>
			{users.map((user) =>
				<div className='userobj-container'>
				<ViewUser
				  className='userobj-containe'
					key={user.ID}
					ID={user.ID}
					name={user.name}
					email={user.email}
					phone={user.phone}
					user_role={user.user_role}
					CreatedAt={user.CreatedAt}
					UpdatedAt={user.UpdatedAt}
					DeletedAt={user.DeletedAt}
			/>
			</div>)}
		</div>
		</div>
	)

	if(isLoading) {
		content = (
			<div>
				<p> loading data .... </p>
			</div>
		)
	}

	return content
}

export default ViewAllUsers
