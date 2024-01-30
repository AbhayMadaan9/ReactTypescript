import React, { useEffect } from "react";
import { useDeleteUserMutation, useGetUsersQuery, useLazyGetUsersQuery } from "../services/userapi";
import { Navigate, useNavigate } from "react-router-dom";
import { User } from "../redux/userslice";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useTokenRefresh } from "../hooks/useRefreshToken";

export const Dashboard = () => {
  //const accessToken = useSelector((state: RootState) => state.auth.accesstoken);
  const {data, error: e, isLoading, isSuccess } = useGetUsersQuery({});

const navigate = useNavigate();
useEffect(() => {
  // const fetchData = async () => {
  //   try {
  //   await useTokenRefresh; // Refresh the access token
  //   } catch (error) {
  //     // Handle errors, e.g., redirect to login if refresh fails
  //     console.error("Error fetching user data:", error);
  //   }
  // };

  if (data) {
    // Handle successful data retrieval
    console.log("Users data:", data);
  }

  if (e) {
    // Handle error
    if ("originalStatus" in e && e.originalStatus === 401) {
      // fetchData(); // If unauthorized, try refreshing the access token
      alert("invalid token. Login again");
      navigate("/login")
    } else {
      console.error("Error fetching user data:", e);
    }
  }
}, [isSuccess, data, e]);

  const [deleteUser] = useDeleteUserMutation();

  const handledelete = async (_id: string) => {
    const confirmm: boolean = window.confirm("Do you want to delete this user");

    if (confirmm) {
      try {
      const res: any =  await deleteUser({id: _id});
      console.log(res)
      } catch (error: any) {
        // Handle unexpected errors
        console.error('An unexpected error occurred:', error);
        alert('Unexpected error occurred');
      }
    }
  };

  return (
   <>
    <Box>
      <Typography variant="h4" mb={3}>
        List of Users
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          {e ? (
            <Typography color="error">Error fetching users</Typography>
          ) : (
            <>
              {data && Array.isArray(data) && data.length > 0 ? (
                data.map((user) => (
                  <Box key={user._id} mb={2} p={2} border="1px solid #ccc" borderRadius={4}>
                    <Typography variant="subtitle1">
                      Username: {user.username}
                    </Typography>
                    <Typography>Email: {user.email}</Typography>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<MdDelete />}
                      onClick={() => handledelete(user._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                ))
              ) : (
                <Typography>No users found.</Typography>
              )}
            </>
          )}
        </>
      )}
    </Box>
   </>
  );
};
