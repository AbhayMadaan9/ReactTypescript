import { Button } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { RemoveToken } from '../redux/authslice'
import { Link } from 'react-router-dom'
const Admin: React.FC = ()=> {
  const dispatch = useDispatch()
  const handlelogout = ()=>{
    dispatch(RemoveToken());
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
    <Button variant="outlined" onClick={handlelogout}>
      Logout
    </Button>
    <div style={{ display: 'flex', gap: '10px' }}>
      <Link to="/dashboard"  color="inherit">
        Dashboard
      </Link>
      <Link to="/settings" color="inherit">
        Settings
      </Link>
    </div>
  </div>
  )
}

export default Admin
