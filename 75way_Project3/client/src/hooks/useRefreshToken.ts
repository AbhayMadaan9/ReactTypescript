import { useEffect } from "react";
import { useRefreshtokenMutation } from "../services/userapi";

export const refreshAccessToken: () => void = async () => {
  const [refreshtoken, { error, isSuccess, isLoading }] = useRefreshtokenMutation();

  try {
    await refreshtoken().unwrap();
  } catch (error) {
    
  }
  
};


