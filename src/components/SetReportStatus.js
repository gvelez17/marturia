import React, {useEffect, useState} from 'react';
import {Link } from "react-router-dom";
import {authorizationHeaders} from '../actions/headers';
import './Admin.scss';
import DataTable from 'react-data-table-component';
import Popup from 'reactjs-popup';

const customStyles = {
  headCells: {
    style: {
      fontSize: '14px',
	  fontWeight: 'bold',
    },
  },  
};

const SetReportStatus = (props) => {
	const [reports, setReports] = useState([]);
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
		
	
	const toggleReportState = (report,updateDoneMap) => {
		
		fetch(process.env.REACT_APP_API_BASE + 'reports/'+report.ID, {
			method: 'PATCH',
			headers: authorizationHeaders()
		})
		.then(res => res.json())
		.then(data => {			
			updateDoneMap.set(report.ID,true)
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
	const deleteReportData = (report,updateDoneMap) => {
		report.updated=false
		fetch(process.env.REACT_APP_API_BASE + 'reports/'+report.ID, {
			method: 'DELETE',
			headers: authorizationHeaders()
		})
		.then(res => res.json())
		.then(data => {
			updateDoneMap.set(report.ID,true)
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
	
	const fetchReportData = () => {
		fetch(process.env.REACT_APP_API_BASE + 'reports', {
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
				
				data.reports.forEach (report  => {let str = "/view/"+report.victimid; report.victimUrl= (<Link to={str} target="_blank">Victim Link</Link>) })
				setReports(data.reports); 
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
	
  
	const updateState = (state) => {
		setSelectedRows(state.selectedRows)
	}
	
	const deleteReports = () => {
		let updateDoneMap = new Map()
		selectedRows.forEach( sr => updateDoneMap.set(sr.ID,false))
		selectedRows.forEach( sr => deleteReportData(sr,updateDoneMap))
	}
	
	const toggleReportStates = () => {
		let updateDoneMap = new Map()
		selectedRows.forEach( sr => updateDoneMap.set(sr.ID,false))
		selectedRows.forEach( sr => toggleReportState(sr,updateDoneMap))		
	}

		
	useEffect(() => {
			fetchReportData();		
	}, [reloadToggle])

	
	const deletePopup = () => {
		return (
		 <Popup trigger={<button className="button"> Delete Reports </button>} modal>
			{close => (
			  <div className="modal">
				<a className="close" onClick={close}>
				  &times;
				</a>
				<div className="header"> Delete Reports </div>
				<div className="content">
					Do you really want to delete {selectedRows.length} reports ?		
				</div>
				<div className="actions">				  
					<button className="button" onClick={()=> {deleteReports();close()}}> Yes </button>			 				
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
			
	const toggleStatePopup = () => {
		return (
		 <Popup trigger={<button className="button"> Toggle State </button>} modal>
			{close => (
			  <div className="modal">
				<a className="close" onClick={close}>
				  &times;
				</a>
				<div className="header"> Toggle Report State</div>
				<div className="content">
					Do you really want to toggle the states for {selectedRows.length} reports ?		
				</div>
				<div className="actions">				  
				  <button className="button" onClick={()=> {toggleReportStates();close()}}> Yes </button>				  					
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
			name:'Reporter',
			selector:'name_of_reporter',
			sortable:true
		},
		{
			name:'Discovery',
			selector:'discovery',
			sortable:true
		},
		{
			name:'State',
			selector:'state',
			sortable:true
		},
		{
			name:'Victim URL',
			selector:'victimUrl',
			sortable:true
		}
	 ]
		
	const deletePopupInstance = deletePopup();
	const toggleStatePopupInstance = toggleStatePopup();
	
	let content = (
		<div className='admin-container'>
		<div className='view-report-container'>
			<DataTable 
				data={reports} 
				columns={columns} 
				selectableRows 
				pagination  
				onSelectedRowsChange={updateState}
				customStyles={customStyles}
				clearSelectedRows={toggleClearRows}
				/>
				
			{deletePopupInstance}
			{toggleStatePopupInstance}
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

export default SetReportStatus
