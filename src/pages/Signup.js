import React, {useRef, useEffect, useState} from 'react';
import MainLayout from '../components/MainLayout';
import { useForm } from 'react-hook-form';
import './User.scss'

const SignUp = () => {
  const nameRef = useRef();
  const { register, handleSubmit, errors } = useForm()
  const [err, setErr] = useState(' ')

  const handleFormSubmit = (data) => {
	  setErr('')
		data.user_role = "all"
		delete data.ccpassword
		console.log(data)
  }

  useEffect(() => {
    document.title = 'Register';
	  nameRef.current.focus();
  }, []);

  return (
    <MainLayout>
		  <div className='register'>
  	    <div className='register-container'>
				  <p name='above-form'/>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
					  <label htmlFor = 'email'> Email </label>
						<input
						  className=''
							type='text'
							name='email'
							ref={(input) => {
				      register(input, { required: true });
				      nameRef.current = input;
			        }}
						/>
						<label htmlFor = 'name'> Name </label>
						<input
						  className=''
							type='text'
							name='name'
							ref={(input) => {
				      register(input, { required: true });
			        }}
						/>
						<label htmlFor = 'password'> Password </label>
						<input
						  className=''
							type='password'
							name='password'
							ref={(input) => {
				      register(input, { required: true });
			        }}
						/>
						<label htmlFor = 'ccpassword'> Confirm Password </label>
						<input
						  className=''
							type='password'
							name='ccpassword'
							ref={(input) => {
				      register(input, { required: true });
			        }}
						/>
						<label htmlFor = 'phone'> Phone Number (Optional) </label>
						<input
						  className=''
							type='tel'
							pattern="[0-9]{10}"
							name='phone'
							ref={(input) => {
				      register(input, { required: false });
			        }}
						/>
						<button> Sign Up </button>
					</form>
        </div>
  	  </div>
	  </MainLayout>
  )
}

export default SignUp
