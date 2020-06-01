import React from 'react';
import MainLayout from '../components/MainLayout';
import AdminMenu from '../components/AdminMenu';
import {Redirect} from 'react-router-dom';
import {tokenIsStillValid} from '../utils/utils';
//e@e.e
const AdminPanel = () => {

	if(!tokenIsStillValid()) {
		return <Redirect to='/login'/>
	}

	const logout = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('exp')
		window.location.reload()
	}

	return (
		<MainLayout>
			<div>
				<AdminMenu></AdminMenu>
				<button
					onClick={logout}>
						Logout
				</button>
			</div>
		</MainLayout>
	)
}

export default AdminPanel
