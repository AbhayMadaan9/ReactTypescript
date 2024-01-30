import React, { useEffect } from "react";
import { useDeleteUserMutation, useGetUsersQuery } from "../services/userapi";
import { Navigate } from "react-router-dom";
import { User } from "../redux/userslice";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const Dashboard = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accesstoken);
  const { data, error, isLoading } = useGetUsersQuery({ token: accessToken });

  useEffect(() => {
    if (data) {
      // Handle successful data retrieval
      console.log('Users data:', data);
    }

    if (error) {
      // Handle error
      console.error('Error fetching user data:', error);
    }
  }, [data, error]);

  const [deleteUser] = useDeleteUserMutation();

  const handledelete = async (_id: string) => {
    const confirmm: boolean = window.confirm("Do you want to delete this user");

    if (confirmm) {
      try {
        await deleteUser({id: _id, token: accessToken});
      } catch (error) {
        // Handle unexpected errors
        console.error('An unexpected error occurred:', error);
        alert('Unexpected error occurred');
      }
    }
  };

  return (
    <>
      <h1>List of Users</h1>
      {isLoading ? (
        <>Loading....</>
      ) : (
        <>
          {error ? (
            <Navigate to="/login" />
          ) : (
            <>
              {data ? (
                data.map((user: User, ind: number) => (
                  <div key={user._id}>
                    <p>{ind + 1}. Username: {user.username}</p>
                    <span>Email: {user.email}</span>
                    <MdDelete onClick={() => handledelete(user._id)} />
                  </div>
                ))
              ) : (
                <>No users found.</>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};
