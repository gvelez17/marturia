import React, {useEffect, useState} from 'react';
import {authorizationHeaders} from '../actions/headers';
import DataTable from 'react-data-table-component';
import Popup from 'reactjs-popup';
import './Admin.scss';

const customStyles = {
  headCells: {
    style: {
      fontSize: '14px',
	  fontWeight: 'bold',
    },
  },  
};
const ViewAllUsers = (props) => {
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [reloadToggle, setReloadToggle] = useState(false);
	const [selectedRows, setSelectedRows] = useState([]);		
	const [toggleClearRows, setToggleClearRows] = useState(false);

	const checkAllUpdatesDone = (updateDoneMap) => {
		const arr = Array.from(updateDoneMap.values())
		const alldone = arr.filter(value => value===false).length===0
		//console.log("alldone: "+alldone)
		// if all update calls have returned reload data from backend to update table
		if(alldone)
		{
			setToggleClearRows(!toggleClearRows)
			setReloadToggle(!reloadToggle)
		}
	}
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

	const deleteUserData = (user,updateDoneMap) => {
		user.updated=false
		fetch(process.env.REACT_APP_API_BASE + 'users/'+user.ID, {
			method: 'DELETE',
			headers: authorizationHeaders()
		})
		.then(res => res.json())
		.then(data => {
			updateDoneMap.set(user.ID,true)
			checkAllUpdatesDone(updateDoneMap)
			if(data.status === 400) {
				//params error				
			} else if(data.status === 200) {
				//got the data			
			} else if(data.status === 403){
				//access forbidden
				
			} else {
				//something went wrong
				
			}
		})
		.catch(err => console.log(err))
	}
	const updateState = (state) => {
		setSelectedRows(state.selectedRows)
	}
	
	const deleteUsers = () => {
		let updateDoneMap = new Map()
		selectedRows.forEach( su => updateDoneMap.set(su.ID,false))
		selectedRows.forEach( su => deleteUserData(su,updateDoneMap))
	}
	
	useEffect(() => {
		if(props.user === 'all') {
			fetchUserData(null);
		} else {
			fetchUserData(props.user);
		}
	}, [reloadToggle])

	const deletePopup = () => {
		return (
		 <Popup trigger={<button className="button"> Delete Users </button>} modal>
			{close => (
			  <div className="modal">
				<a className="close" onClick={close}>
				  &times;
				</a>
				<div className="header"> Delete Users </div>
				<div className="content">
					Do you really want to delete {selectedRows.length} users ?		
				</div>
				<div className="actions">				  
					<button className="button" onClick={()=> {deleteUsers();close()}}> Yes </button>			 				
				  <button
					className="button"
					onClick={() => {              
					  close();
					}}
				  >
					close modal
				  </button>
				</div>
			  </div>
			)}
		  </Popup> )
		}
		
	const columns = [ 
		{
			name:'ID',
			selector:'ID',
			sortable:true
		},
		{
			name:'Name',
			selector:'name',
			sortable:true
		},
		{
			name:'Email',
			selector:'email',
			sortable:true
		},
		{
			name:'Phone',
			selector:'phone',
			sortable:true
		},
		{
			name:'Role',
			selector:'user_role',
			sortable:true
		},
		{
			name:'CreatedAt',
			selector:'CreatedAt',
			sortable:true
		},
		{
			name:'UpdatedAt',
			selector:'UpdatedAt',
			sortable:true
		},
		{
			name:'DeletedAt',
			selector:'DeletedAt',
			sortable:true
		}
		
	 ]
		
	const deletePopupInstance = deletePopup();
	let content = (
		<div className='admin-container'>
		<div className='view-user-container'>
			<DataTable 
				data={users} 
				columns={columns} 
				selectableRows 
				pagination  
				onSelectedRowsChange={updateState}
				customStyles={customStyles}
				clearSelectedRows={toggleClearRows}
				/>
				
			{deletePopupInstance}		
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
