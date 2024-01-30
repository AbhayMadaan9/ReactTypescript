import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { useGetUserQuery } from '../services/userapi';

// type Props = {
//   children?: React.ReactNode;
// };

export const UserLayout = () => {
  const navigate = useNavigate()
  const accessToken = useSelector((state: RootState) => state.auth.accesstoken);
  const { data, error, isLoading } = useGetUserQuery({ token: accessToken });

  useEffect(() => {
    if (data) {
      // Handle successful data retrieval
      console.log('User data:', data);
      if(data.role !== "admin") {alert("invalid user"); navigate("/login")}
    }

    if (error) {
      // Handle error
      console.error('Error fetching user data:', error);
    }
  }, [data, error]);
    return (
      <>
        {isLoading? <>Loading..</>: <Outlet />}
        </>
    )
};
