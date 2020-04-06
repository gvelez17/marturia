import React, {useEffect, useState} from 'react';
import AdminChoice from '../components/Adminchoice';
import DeleteUser from '../components/Admindeleteuser';
import CreateUser from '../components/Createuser';
import ViewAllUsers from '../components/Viewallusers';
import LookupUser from '../components/Adminviewuser';
import './Adminpanel.scss';
//e@e.e
const AdminPanel = () => {
	const [display, setDisplay] = useState('menu');

	let menu = (
		<div className='admin-container'>
		  <AdminChoice
			  text={'Create User'}
				handleClick={() => setDisplay('create')}
			/>
			<AdminChoice
			  text={'View User'}
				handleClick={() => setDisplay('view')}
			/>
			<AdminChoice
			  text={'View All Users'}
				handleClick={() => setDisplay('viewall')}
			/>
			<AdminChoice
			  text={'Delete User'}
				handleClick={() => setDisplay('delete')}
			/>
			<AdminChoice
			  text={'Change User Permissions'}
				handleClick={() => alert('ayy')}
			/>
		</div>
	)

	let del = (
		<DeleteUser setDisplay={setDisplay}/>
	)

	let create = (
		<CreateUser setDisplay={setDisplay}/>
	)

	let viewall = (
		<ViewAllUsers user={'all'} setDisplay={setDisplay}/>
	)

	let view = (
		<LookupUser setDisplay={setDisplay}/>
	)

	let content;
	switch (display) {
		case 'menu':
			content = menu;
			break;
		case 'delete':
			content = del;
			break;
		case 'viewall':
			content = viewall;
			break;
		case 'create':
			content = create;
			break;
		case 'change':
			content = null;
			break;
		case 'view':
			content = view;
			break;
		default:
			content = 'menu'
	}

	return content
}

export default AdminPanel
