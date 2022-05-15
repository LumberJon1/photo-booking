import React from "react";
import {useState} from "react";
import {useMutation} from "@apollo/client";
import {ADD_USER} from "../utils/mutations";
import Auth from "../utils/auth";

const Signup = () => {
    const [formState, setFormState] = useState({ username: "", password: "", email: "", firstName: "", lastName: ""});
    const [addUser, {error}] = useMutation(ADD_USER);
  
    // update state based on form input changes
    const handleChange = (event) => {
      const { name, value } = event.target;
  
      setFormState({
        ...formState,
        [name]: value,
      });
    };
  
    // submit form
    const handleFormSubmit = async (event) => {
      event.preventDefault();

      // Error handling
      try {
          const {data} = await addUser({
              // Pass in the variables from formState to use in populating addUser
              variables: {...formState}
          });
          console.log(data);
          Auth.login(data.addUser.token)
        }
        catch (e) {
            console.error(e);
        }
    };
  
    return (
      <main className='flex-row justify-center mb-4'>
        <div className='col-12 col-md-6'>
          <div className='card'>
            <h4 className='card-header'>Sign Up</h4>
            <div className='card-body'>
              <form onSubmit={handleFormSubmit}>
                <input
                  className='form-input'
                  placeholder='Your username'
                  name='username'
                  type='username'
                  id='username'
                  value={formState.username}
                  onChange={handleChange}
                />
                <input
                  className='form-input'
                  placeholder='******'
                  name='password'
                  type='password'
                  id='password'
                  value={formState.password}
                  onChange={handleChange}
                />
                <input
                  className='form-input'
                  placeholder='Your email'
                  name='email'
                  type='email'
                  id='email'
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className='form-input'
                  placeholder='First Name'
                  name='firstName'
                  type='firstName'
                  id='firstName'
                  value={formState.firstName}
                  onChange={handleChange}
                />
                <input
                  className='form-input'
                  placeholder='Last Name'
                  name='lastName'
                  type='lastName'
                  id='lastName'
                  value={formState.lastName}
                  onChange={handleChange}
                />
                <button className='btn d-block w-100' type='submit'>
                  Submit
                </button>
                {error && <div>Signup failed</div>}
              </form>
            </div>
          </div>
        </div>
      </main>
    );
  };
  
  export default Signup;
  