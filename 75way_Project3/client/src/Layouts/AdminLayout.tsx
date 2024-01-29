import React, {useEffect} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useGetUserQuery } from '../services/userapi';


// type Props = {
//   children?: React.ReactNode;
// };

export const AdminLayout = (props: {authtoken: string}) => {
  console.log(props.authtoken)
  const { data, error, isLoading } = useGetUserQuery({ token: props.authtoken });

  useEffect(() => {
    if (data) {
      // Handle successful data retrieval
      console.log('User data:', data);
    }

    if (error) {
      // Handle error
      console.error('Error fetching user data:', error);
    }
  }, [data, error]);
    return (
      <>
     {isLoading? <>Loading....</>:

      <>
      {
        error?<Navigate to="/login"/>:
        <>
        <>Username: {data.username}</>
        <Outlet/>
        </>
      }
      </>
      }
</>
    )
};
