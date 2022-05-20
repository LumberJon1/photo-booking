import React, { useState } from 'react';
import {useMutation} from "@apollo/client";
import {LOGIN_USER} from "../utils/mutations";
import Auth from '../utils/auth';
import {TextField, Button} from '@mui/material';

const Login = (props) => {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [login, {error}] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
    console.log(formState);
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
        const {data} = await login({
            variables: {...formState}
        });

        console.log(data);
        Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        
    };

    // clear form values
    setFormState({
      username: "",
      password: "",
    });
  };

  return (
    <div className='flex flex-col justify-start items-center h-full w-screen'>
      <div>
        <h4 className="font-bold text-xl mb-6 mt-2">Log In</h4>
      </div>
      <form onSubmit={handleFormSubmit}
        className="flex flex-col items-center justify-evenly p-2 bg-slate-200 h-1/2 rounded shadow-lg"
      >
        <TextField
          id="username"
          label="Username"
          type="username"
          name="username"
          required
          value={formState.username}
          onChange={handleChange}
        >
        </TextField>
        <TextField
          id="password"
          label="password"
          name="password"
          required
          type="password"
          value={formState.password}
          onChange={handleChange}
        >
        </TextField>
        <Button type="submit" variant="contained">
          Submit
        </Button>
        {error && <div className='text-red-600 font-bold text-lg'>Login failed</div>}
      </form>
    </div>
  );
};

export default Login;