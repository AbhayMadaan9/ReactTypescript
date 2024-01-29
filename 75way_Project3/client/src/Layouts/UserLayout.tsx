import React from 'react';
import { Outlet } from 'react-router-dom';

type Props = {
  children?: React.ReactNode;
};

export const UserLayout = ({ children }: Props) => {
  
    return (
        <Outlet />
    )
};
