import React, {useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {AdminLayout} from './Layouts/AdminLayout';
import {Dashboard} from './pages/Dashboard';
import Settings from './pages/Settings';
import { UserLayout } from './Layouts/UserLayout';
import { BasicLayout } from './Layouts/BasicLayout';
import Admin from './pages/Admin';
import User from './pages/User';
import Basic from './pages/Basic';
import Register from './pages/Register';
import {Login} from './pages/Login';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';



export default function App() {
  const [authtoken, setauthtoken] = useState<string>("")
  const accessToken = useSelector((state: RootState) => state.auth.accesstoken);

  useEffect(() => {
    // Update authtoken when accessToken changes
    setauthtoken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    // Initialize authtoken from local storage on mount
    const storedToken = window.localStorage.getItem('authtoken');
    if (storedToken) {
      setauthtoken(storedToken);
    }
  }, []);
  return (
    <div>
     <BrowserRouter>
     <Routes>
     <Route path = "/" element={<AdminLayout authtoken={authtoken}/>}>
          <Route index path='dashboard' element={<Dashboard authtoken={authtoken} />} />
          <Route path="settings" element={<Settings />} />
          <Route path='home' element= {<Admin/>}/>
        </Route>
        <Route path='register' element= {<Register/>}/>
         <Route path='login' element= {<Login authtoken = {authtoken}/>}/>
        </Routes>
      {/* <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route path='home' element= {<User/>}/>
        </Route>
      </Routes>
      <Routes>
        <Route path="/" element={<BasicLayout />}>
          <Route path='home' element= {<Basic/>}/>
        </Route>
      </Routes> */}
    </BrowserRouter>
    </div>
  )
}
