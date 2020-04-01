import React, {useRef, useEffect, useState} from 'react';
import MainLayout from '../components/MainLayout';
import { useForm } from 'react-hook-form';
import './User.scss'

const SignUp = () => {
  const nameRef = useRef();
  const { register, watch, handleSubmit, errors } = useForm()
  const [err, setErr] = useState(' ')

  const handleFormSubmit = (data) => {
	  setErr('')
		data.user_role = "all"
		delete data.ccpassword
		fetch(process.env.REACT_APP_API_BASE + 'users', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
		  'Content-Type': 'application/json'
	    }
		})
		.then(res => res.json())
		.then(data => {
			if(data.status === 400) {
				//invalid request
			} else if(data.status === 201) {
				//user created
			} else {
				//something went wrong
			}
		})
		.catch(err => console.log(err))
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
						{errors.email &&
							<p className="error">Email is required</p>}
						<label htmlFor = 'name'> Name </label>
						<input
						  className=''
							type='text'
							name='name'
							ref={(input) => {
				      register(input, { required: true });
			        }}
						/>
						{errors.name &&
							<p className="error">Name is required</p>}
						<label htmlFor = 'password'> Password </label>
						<input
						  className=''
							type='password'
							name='password'
							ref={(input) => {
				      register(input, { required: true });
			        }}
						/>
						{errors.password &&
							<p className="error"> Password is required</p>}
						<label htmlFor = 'ccpassword'> Confirm Password </label>
						<input
						  className=''
							type='password'
							name='ccpassword'
							ref={register({validate: (value) => {
	    					return value === watch('password');
	  					}})}
						/>
						{errors.ccpassword &&
							<p className="error">Passwords must match</p>}
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
