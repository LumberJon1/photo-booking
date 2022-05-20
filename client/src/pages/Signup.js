import React from "react";
import {useState} from "react";
import {useMutation} from "@apollo/client";
import {ADD_USER} from "../utils/mutations";
import {Button, TextField} from "@mui/material";
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
      <div className='flex flex-col justify-start items-center h-full w-screen'>
        <div>
          <h4 className="font-bold text-xl mb-6 mt-2">Sign Up</h4>
        </div>
        <form onSubmit={handleFormSubmit}
          className="flex flex-col items-center justify-evenly p-3 bg-slate-100 h-3/4 w-3/4 rounded shadow-lg"
        >
          <TextField
            className=""
            label='Username'
            name='username'
            type='username'
            id='username'
            value={formState.username}
            onChange={handleChange}
          />
          <TextField
            className=""
            placeholder='******'
            label="Password"
            name='password'
            type='password'
            id='password'
            value={formState.password}
            onChange={handleChange}
          />
          <TextField
            className=""
            label='Email'
            name='email'
            type='email'
            id='email'
            value={formState.email}
            onChange={handleChange}
          />
          <TextField
            className=""
            label='First Name'
            name='firstName'
            type='firstName'
            id='firstName'
            value={formState.firstName}
            onChange={handleChange}
          />
          <TextField
            className='form-TextField'
            label='Last Name'
            name='lastName'
            type='lastName'
            id='lastName'
            value={formState.lastName}
            onChange={handleChange}
          />
          <Button variant="contained" type='submit'>
            Submit
          </Button>
          {error && <div className='text-red-600 font-bold text-lg'>Signup failed</div>}
        </form>
      </div>
    );
  };
  
  export default Signup;
  