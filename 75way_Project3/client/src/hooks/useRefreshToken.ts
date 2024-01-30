import { useEffect } from 'react';
import { useRefreshtokenMutation } from '../services/userapi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {setAuthToken} from '../redux/authslice'




export const useTokenRefresh = (): void => {
  const [refreshtoken, {isSuccess, isLoading, error}] = useRefreshtokenMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const refreshTokens = async () => {
    try {
       await refreshtoken();
      if (error) {
        alert(error);
        navigate('/login');
        throw new Error('Failed to refresh token');
      }

      if(isSuccess)
      {
        dispatch(setAuthToken())
      } // Assuming the new access token is part of the response
    } catch (error: any) {
      alert(error.message)
      navigate('/login');
    }
  };
  useEffect(() => {
    refreshTokens();
  }, [refreshTokens]);

  // Optionally, you can return loading state or other information about the token refresh
  // For example:
  // const isRefreshing = refreshTokenMutation.isLoading;
  // return { isRefreshing };
};


