import React from 'react';
import './Admin.scss';

const ViewUser = (userObj) => {
	return (
		<React.Fragment>
			<b> UserID: </b> <span> {userObj.ID} </span> <br/>
			<b> Name: </b> <span> {userObj.name} </span> <br/>
			<b> Email: </b> <span> {userObj.email} </span> <br/>
			<b> Phone Number: </b> <span> {userObj.phone} </span> <br/>
			<b> User Role: </b> <span> {userObj.user_role} </span> <br/>
			<b> Created At: </b> <span> {userObj.CreatedAt} </span> <br/>
			<b> Updated At: </b> <span> {userObj.UpdatedAt} </span> <br/>
			<b> Deleted At: </b> <span> {userObj.DeletedAt} </span> <br/>
		</React.Fragment>
	)
}

export default ViewUser
