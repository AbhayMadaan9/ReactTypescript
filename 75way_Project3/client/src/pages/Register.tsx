import { Button, FormLabel, Input } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler, FieldValues, SubmitErrorHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useRegisterUserMutation } from '../services/userapi';
import { Navigate, useNavigate } from 'react-router-dom';
// import { yupResolver } from '@hookform/resolvers/yup';



// Define Yup schema for validation
// const schema = yup.object().shape({
//   // firstName: yup.string().required('First Name is required'),
//   // lastName: yup.string().required('Last Name is required'),
//   username: yup.string().required('Username is required'),
//   email: yup.string().email('Invalid email').required('Email is required'),
//   password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
//   // confirmPassword: yup.string().oneOf([yup.ref('password'), ""], 'Passwords must match'),
// });

// Define form data interface
interface FormData {
  // firstName: string;
  // lastName: string;
  username: string;
  email: string;
  password: string;
  // confirmPassword: string;
}

// RegisterForm component
const Register: React.FC = () => {


  const [isLoading, setisLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const { register, reset, handleSubmit, formState: { errors } } = useForm<FormData>();

  const [registerUser, { data, error }] = useRegisterUserMutation();
  const onSubmit: SubmitHandler<FormData> = async (dataa: FormData) => {
    setisLoading(true);

    try {
      await registerUser(dataa);
      if (data) {
        console.log('Registration successful:', data);
        setisLoading(false);
        reset()
        navigate('/login');
      } else if (error) {
        // Handle error state
        setisLoading(false)
        reset()
        console.error('Invalid Credentials:', error);
        alert('Error occurred');
      }
    } catch {
      // Handle unexpected errors
      console.error('An unexpected error occurred:', error);
      alert('Unexpected error occurred. please refresh');
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
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                {...register("username", { required: true })}
                aria-invalid={errors.username ? "true" : "false"}
              />
              {errors.username?.type === "required" && (
                <p role="alert">Username is required</p>
              )}
            </div>
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
            <Button type="submit">Register</Button>
          </form>
        </> :
        <>
          Loading ....
        </>
      }
    </>
  );
};

export default Register;
