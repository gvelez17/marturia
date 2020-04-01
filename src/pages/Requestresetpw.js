import React, {useRef, useEffect, useState} from 'react';
import MainLayout from '../components/MainLayout';
import { useForm } from 'react-hook-form';
import './User.scss'

const ReqResetPW = () => {
  const nameRef = useRef();
  const { register, handleSubmit, errors } = useForm()

	const handleFormSubmit = (data) => {

	}

  useEffect(() => {
    document.title = 'Request Password Reset';
    nameRef.current.focus();
  }, []);

	return (
		<MainLayout>
			<p name='above-form'/>
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
					<button> Submit </button>
					{errors.email &&
						<p className="error">Email is required</p>}
				</form>
			</div>
		</MainLayout>
	)
}

export default ReqResetPW
