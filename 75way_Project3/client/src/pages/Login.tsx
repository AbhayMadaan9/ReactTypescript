import { Button, FormLabel, Input } from '@mui/material';
import React, { useState } from 'react';
import { useForm, SubmitHandler, FieldValues, SubmitErrorHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useLoginUserMutation } from '../services/userapi';
import { UseDispatch, useDispatch } from 'react-redux';
import {  Navigate, useNavigate } from 'react-router-dom';
import { setToken } from '../redux/user/authslice';
// import { yupResolver } from '@hookform/resolvers/yup';




// Define Yup schema for validation
// const schema = yup.object().shape({
//   // firstName: yup.string().required('First Name is required'),
//   // lastName: yup.string().required('Last Name is required'),
// //  username: yup.string().required('Username is required'),
//   email: yup.string().email('Invalid email').required('Email is required'),
//   password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
//   // confirmPassword: yup.string().oneOf([yup.ref('password'), ""], 'Passwords must match'),
// });

// Define form data interface
interface FormData {
  // firstName: string;
  // lastName: string;
  email: string;
  password: string;
  // confirmPassword: string;
}

// RegisterForm component
export const Login = (props: {authtoken: string | null}) => {


  const [isLoading, setisLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if(props.authtoken) {navigate("/home")}
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const [loginUser, { data, error }] = useLoginUserMutation();
  const onSubmit: SubmitHandler<FormData> = async (dataa: FormData) => {
    setisLoading(true);


    try {
      await loginUser(dataa);
      if (data) {
        console.log('login successful:', data);
        dispatch(setToken({accesstoken: data.sessionToken}))
        setisLoading(false);
        reset();
        navigate('/home');
      } else if (error) {
        // Handle error state
        setisLoading(false)
        console.error('An error occurred:', error);
        alert('Error occurred');
      }
    } catch {
      // Handle unexpected errors
      console.error('An unexpected error occurred:', error);
      alert('Unexpected error occurred');
    } finally {
      setisLoading(false);
    }
  }

  // Error handler
  //   const onError: SubmitErrorHandler<FieldValues> = (errors, e) => {
  // if(errors)
  // {
  //   alert(e);
  // }
  // else if(error) {alert(error)}
  //   };

  return (
    <>
      {!isLoading ?
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                {...register("email", { required: true })}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email?.type === "required" && (
                <p role="alert">Email is required</p>
              )}
            </div>

            <div>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input type='password'
                {...register("password", { required: true })}
                aria-invalid={errors.password ? "true" : "false"}
              />
              {errors.password?.type === "required" && (
                <p role="alert">Password is required</p>
              )}
            </div>
            <Button type="submit">login</Button>
          </form>
        </> :
        <>
          Loading ....
        </>
      }
    </>
  );
};


