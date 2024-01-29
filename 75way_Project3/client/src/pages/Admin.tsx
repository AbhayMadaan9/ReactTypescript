import { Button } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { RemoveToken } from '../redux/user/authslice'
import { Link } from 'react-router-dom'
const Admin: React.FC = ()=> {
  const dispatch = useDispatch()
  const handlelogout = ()=>{
    dispatch(RemoveToken());
  }
  return (
    <div>
      <Button onClick={handlelogout}>Logout</Button>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/settings">Settings</Link>
    </div>
  )
}

export default Admin
