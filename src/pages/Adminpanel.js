import React, {useEffect, useState} from 'react';
import MainLayout from '../components/MainLayout';
import AdminMenu from '../components/AdminMenu';
import { NavLink } from 'react-router-dom';
//e@e.e
const AdminPanel = () => {

	return (
		<MainLayout>
			<AdminMenu></AdminMenu>
		</MainLayout>
	)
}

export default AdminPanel
