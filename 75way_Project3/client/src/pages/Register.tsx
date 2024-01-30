import { Box, Button, Container, FormLabel, Input, MenuItem, Paper, Select, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useRegisterUserMutation } from '../services/userapi';
import { Link, useNavigate } from 'react-router-dom';
 import { yupResolver } from '@hookform/resolvers/yup';
import { Bounce, toast } from 'react-toastify';
import loaderimg from '../assests/75waylogo.png'



const schema = yup.object().shape({
   role: yup.string().required('role is required'),
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
});

// Define form data interface
interface FormData {
  username: string;
  email: string;
  password: string;
  role: string;
}

// RegisterForm component
const Register: React.FC = () => {

  const navigate = useNavigate();

  const { register, reset, handleSubmit, formState: { errors } } = useForm<FormData>(
    {
      resolver: yupResolver(schema)
    }
  );

  const [registerUser, { data, error, isLoading, isSuccess }] = useRegisterUserMutation();

  useEffect(()=>{
if(error)
{
  alert("Registration failed. Try again ")
  toast(`Registeration error: ${error}`, {
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
  console.error('Registration failed:', error);

}
else if(isSuccess){
  toast('Registeration successfull', {
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
    alert("Registration successfull")
  console.log('Registration successful:', data);
  reset();
  navigate('/login');
}

  }, [isSuccess, error])
  const onSubmit: SubmitHandler<FormData> = async (dataa: FormData) => {
   await registerUser(dataa)
  }

  return (
    <>
      {!isLoading ?
        <>
        <Container component="main" maxWidth="xs" style={{ marginTop: '50px' }}>
      <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <Box mb={2} width="100%">
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              {...register("username")}
              error={!!errors.username}
            />
          </Box>
          <Box mb={2} width="100%">
            <FormLabel htmlFor="role">Role</FormLabel>
            <Select
              {...register("role")}
              defaultValue="admin"
              error={!!errors.role}
              displayEmpty
            >
              <MenuItem value="" disabled>Select Role</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </Select>
            {errors.role && (
              <p role="alert">{errors.role.message}</p>
            )}
          </Box>
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
              Register
            </Button>
  
          </Box>
      
        </form>
      
      </Paper>
      <Link to = "/login">Already have account</Link>
    </Container>
        </> :
        <>
         <img src={loaderimg} alt="loader" />
        </>
      }
    </>
  );
};

export default Register;
