import React, {useEffect } from 'react';
import { useForm } from 'react-hook-form';
import MainLayout from '../components/MainLayout';
import IncidentForm from '../components/IncidentForm';
import './Submit.scss';


const Submit = (props) => {
	
  const { register, errors } = useForm()
  
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
		  
        </div>
      </div>


    </MainLayout>
	

  );
};

export default Submit;
