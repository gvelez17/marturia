import React, {useRef, useEffect, useState} from 'react';
import MainLayout from '../components/MainLayout';
import { useForm } from 'react-hook-form';
import './User.scss';

const ResetPW = () => {
  const nameRef = useRef();
  const { register, watch, handleSubmit, errors } = useForm()

	const handleFormSubmit = (data) => {
		console.log(data)
	}

  useEffect(() => {
    document.title = 'Reset Password';
    nameRef.current.focus();
  }, []);

	return (
		<MainLayout>
			<div className='reset-container'>
			  <p name='above-form'/>
				<form onSubmit={handleSubmit(handleFormSubmit)}>
					<label htmlFor='password'> New Password </label>
					<input
						id='password'
						name='password'
						type="password"
						ref={(input) => {
							register(input, { required: true });
							nameRef.current = input;
						}}
					/>
					<label htmlFor='ccpassword'> Confirm Password </label>
					<input
						id='ccpassword'
						name='ccpassword'
						type="password"
						ref={register({validate: (value) => {
    					return value === watch('password');
  					}})}
					/>
					<button> Submit </button>
					{errors.ccpassword &&
						<p className="error">Passwords must match</p>}
				</form>
			</div>
		</MainLayout>
	)
}

export default ResetPW
