import React, {useRef, useEffect, useState} from 'react';
import MainLayout from '../components/MainLayout';
import { useForm } from 'react-hook-form';
import './User.scss'

const ReqResetPW = () => {
  const nameRef = useRef();
  const { register, handleSubmit, errors } = useForm()

	const handleFormSubmit = (data) => {
		fetch(process.env.REACT_APP_API_BASE + 'email', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
		  'Content-Type': 'application/json'
	    }
		})
		.then(res => res.json())
		.then(data => {
			if(data.status === 200) {
				//email sent successfully
			} else if(data.status === 400) {
				//invalid request
			} else if(data.status === 404) {
				//some email error
			} else {
				//something went wrong
			}
		})
		.catch(err => console.log(err))
	}

  useEffect(() => {
    document.title = 'Request Password Reset';
    nameRef.current.focus();
  }, []);

	return (
		<MainLayout>
			<div className='reqreset-container'>
			  <p name='above-form'/>
				<form onSubmit={handleSubmit(handleFormSubmit)}>
					<label htmlFor='email'> Email </label>
					<input
						id='email'
						name='email'
						type="text"
						ref={(input) => {
							register(input, { required: true });
							nameRef.current = input;
						}}
					/>
					{errors.email &&
						<p className="error">Email is required</p>}
					<button> Submit </button>
				</form>
			</div>
		</MainLayout>
	)
}

export default ReqResetPW
