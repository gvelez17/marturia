import React, {useRef, useEffect, useState} from 'react';
import MainLayout from '../components/MainLayout';
import { useForm } from 'react-hook-form';
import './User.scss';

const Login = () => {
  const nameRef = useRef();
  const { register, handleSubmit, errors } = useForm()
  const [err, setErr] = useState(' ')

  useEffect(() => {
    document.title = 'Login';
	  nameRef.current.focus();
  }, []);

  const handleFormSubmit = (data) => {
	  setErr('')
	  fetch(process.env.REACT_APP_API_BASE + 'signin', {
      method: 'POST',
	    body: JSON.stringify(data),
	    headers: {
		  'Content-Type': 'application/json'
	    }
	  })
	  .then(res => res.json())
	  .then(data => {
	    if (data.status === 404) {
	      //invalid login credentials
        setErr('Username or password incorrect')
	    } else if (data.status === 400) {
		    //invalid request
		    setErr('Invalid request')
	    } else if(data.status === 200) {
		    localStorage.setItem('token', data.token)
		    localStorage.setItem('expiration', data.Expires)
	    } else {
		    setErr('Something went wrong')
	    }
	  })
	  .catch(err => {
      console.log(err)
	  })
  }

  return (
	  <MainLayout>
	    <div className='login'>
	  	  <div className='login-container'>
	        <p name='above-form'/>
		      <form onSubmit={handleSubmit(handleFormSubmit)}>
		  	    <label htmlFor='email'> Email </label>
		        <input
		          className=''
			        type='text'
			        name='email'
			        ref={(input) => {
				      register(input, { required: true });
				      nameRef.current = input;
			        }}
			      />
			      <label htmlFor='password'> Password </label>
			      <input
			        className=''
			        type='password'
			        name='password'
		          ref={register({ required: true })}
			      />
			      <p className='error'> {err} </p>
			      <button> Login </button>
		      </form>
        </div>
	    </div>
	  </MainLayout>
  )
}

export default Login
