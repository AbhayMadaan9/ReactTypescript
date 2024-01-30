import { Box, Button, Container, FormLabel, Input, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, FieldValues, SubmitErrorHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useLoginUserMutation } from '../services/userapi';
import { UseDispatch, useDispatch } from 'react-redux';
import {  Link, Navigate, useNavigate } from 'react-router-dom';
import { setToken } from '../redux/authslice';
import { yupResolver } from '@hookform/resolvers/yup';
import { Bounce, toast } from 'react-toastify';
import loaderimg from '../assests/75waylogo.png'




// Define Yup schema for validation
const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),

});

// Define form data interface
interface FormData {
  email: string;
  password: string;
}

// LoginForm component
export const Login = (props: {authtoken: string | null}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if(props.authtoken) {navigate("/home")}
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const [loginUser, { data, error, isSuccess, isLoading }] = useLoginUserMutation();
  useEffect(()=>{
    if(error)
    {
      alert("Login failed. Try again ")
      toast(`login error: ${error}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
      // Handle server-side errors
      console.error('login failed:', error);
    
    }
    else if(isSuccess){
      toast('login successfull', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
        alert("login successfull")
        console.log('login successful:', data);
        dispatch(setToken())
  
        reset();
        navigate('/home');
    }
    
      }, [isSuccess, error])
  const onSubmit: SubmitHandler<FormData> = async (dataa: FormData) => {
console.log(dataa)
    try {
      await loginUser(dataa);
    } catch {
      console.error('An unexpected error occurred:', error);
      alert('Unexpected error occurred');
    } 
  }

  return (
    <>
    {!isLoading ?
      <>
      <Container component="main" maxWidth="xs" style={{ marginTop: '50px' }}>
    <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <Box mb={2} width="100%">
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            {...register("email")}
            error={!!errors.email}
          />
        </Box>
        <Box mb={2} width="100%">
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            type="password"
            {...register("password")}
            error={!!errors.password}
          />
        </Box>
        <Box textAlign="center" width="100%">
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </Box>
      </form>
    </Paper>
    <Link to="/register">Don't have account</Link>
  </Container>
      </> :
      <>
      Loading...
       <img src={loaderimg} alt="loader" />
      </>
    }
  </>
  );
};


