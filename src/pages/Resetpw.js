import React, {useRef, useEffect, useState} from 'react';
import MainLayout from '../components/MainLayout';
import { useForm } from 'react-hook-form';
import './User.scss';

//need to get the token, how that will occur is not certain yet, wait for more information from jesus
const ResetPW = () => {
  const nameRef = useRef();
  const { register, watch, handleSubmit, errors } = useForm()

	const handleFormSubmit = (data) => {
		delete data.ccpassword

		fetch(process.env.REACT_APP_API_BASE + 'reset', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
		  'Content-Type': 'application/json'
	    }
		})
		.then(res => res.json())
		.then(data => {
			if(data.status === 200) {
				//password changed
			} else if(data.status === 400) {
				//invalid request
			} else if(data.status === 404) {
				//error changing password
			} else {
				//something went wrong
			}
		})
		.catch(err => console.log(err))
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
					{errors.ccpassword &&
						<p className="error">Passwords must match</p>}
					<button> Submit </button>
				</form>
			</div>
		</MainLayout>
	)
}

export default ResetPW
