import React from 'react';
import { Outlet } from 'react-router-dom';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

// type Props = {
//   children?: React.ReactNode;
// };

export const UserLayout = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accesstoken);
    return (
        <Outlet />
    )
};
