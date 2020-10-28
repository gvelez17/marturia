import React, {useRef} from 'react';
import { useForm } from 'react-hook-form';
import {authContentTypeHeaders} from '../actions/headers';
import '../pages/User.scss'

const CreateUser = (props) => {
  const nameRef = useRef();
  const { register, watch, handleSubmit, errors } = useForm()

  const handleFormSubmit = (data) => {
		delete data.ccpassword
		console.log(data)
		fetch(process.env.REACT_APP_API_BASE + 'users', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: authContentTypeHeaders()
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
			if(data.status === 400) {
				//invalid request
				alert(data.message)
			} else if(data.status === 201) {
				//user created
				alert('user successfully created')
				Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""));
			}  else if(data.status === 403){
				//access forbidden
				alert('access forbidden');
			}else {
				//something went wrong
				alert('something went wrong')
			}
		})
		.catch(err => console.log(err))
  }

  return (
		  <div className='register'>
  	    	<div className='register-container'>
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
									ref={
										register({validate: (value) => {
	    								return value === watch('password');
	  									}}
	  								)}
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
								<label htmlFor='user_role'> User Role </label>
								<select
						  			className=''
									name='user_role'
									ref={register}
								>
									<option value={'editor'}> editor </option>
									<option value={'admin'}> admin </option>
								</select>
						<button> Create Account </button>
					</form>
        		</div>
  	 		 </div>
 		)
}

export default CreateUser
