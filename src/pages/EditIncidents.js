import React, { useRef, useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { useForm } from 'react-hook-form';
import MainLayout from '../components/MainLayout';
import IncidentForm from '../components/IncidentForm';
import './Submit.scss';
import langs from '../data/languages.js';
import {contentTypeHeaders, authContentTypeHeaders} from '../actions/headers'
import {constructReportObj, submitVictimTranslation, submitAllIncidents} from '../actions/submit'
import {getISOfromDatepicker} from '../utils/utils'
import data from '../data/countries.json';
import statuses from '../data/status.json';
import healthStatuses from '../data/health_status.json';


const Submit = (props) => {
	

  const nameRef = useRef();
  const { register, handleSubmit, errors } = useForm()
	const [showRedirectModal, setShowRedirectModal] = useState(false)
	const [victimID, setVictimID] = useState(-1)
	



const RedirectToView = () => {
	props.history.push('/view/'+victimID)
}

const Modal = () => {
  const CloseModal = () => {setShowRedirectModal(false)};
  
  return (
  <Popup modal closeOnDocumentClick	onClose={RedirectToView} open={showRedirectModal}>
      <div className="modal">
            Successfully submitted a victim <br/>
			You will be redirected to the stored profile
			<a className="close" onClick={RedirectToView} >
              &times;
            </a>			
	   </div>
  </Popup>
  )
   
};


	
  
  useEffect(() => {
    document.title = 'Edit Incidents - Testimony Database'
		
  }, []);

  return (
    <MainLayout>	
      <div className="submit page">
        <div className="wrapper">
       <form>
			 <IncidentForm victimId={props.match.params.id} editMode={true} register={register} errors={errors}/>
             </form>         
		  <Modal />
        </div>
      </div>


    </MainLayout>
	

  );
};

export default Submit;
