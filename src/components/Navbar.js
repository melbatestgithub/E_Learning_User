import React from 'react'
import { Search as SearchIcon  } from '@mui/icons-material';
import { AppBar, Toolbar, Typography, Box,useTheme, TextField ,InputAdornment,Avatar, Button} from '@mui/material';
import {useNavigate} from 'react-router-dom'

import avatar from '../assets/avatar.jpg'
const Navbar = () => {
  const navigate=useNavigate()

  const handleLogout=()=>{
    console.log("Logged out")
    localStorage.removeItem('user')
    navigate('/login')
    

  }

  const theme=useTheme()
  return (
    <AppBar
    position='fixed'
    sx={{
      width: `calc(100% - 250px)`,
      backgroundColor: 'white',
      zIndex: theme.zIndex.drawer + 1, 
    }}
    >
       <Toolbar>
        <Box variant="h6" sx={{color:"#000",display:"flex",flexDirection:"column",alignItems:"start"}}>
       <Typography variant='h5' sx={{fontWeight:"bold"}}>Dashboard</Typography>  
       <Typography sx={{color:theme.palette.primary.main}}>Welcome  Instructor name </Typography>  
        </Box> 
        <Box sx={{ flexGrow: 1 }} />
        <Box  >
          <TextField
          type='search'
          placeholder='Search...'
          InputProps={{
            startAdornment:(
              <InputAdornment position='start'>
              <SearchIcon/>
              </InputAdornment>
            )
          }}
          sx={{width:300,background:"#EEEDEB",borderRadius:6 ,border:"none", '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none', 
            },
          },}} />
        </Box>
        <Box sx={{margin:".2rem .8rem",display:"flex",alignItems:'center',gap:2}}>
       <Button sx={{backgroundColor:"#D3494E",color:'white'}} onClick={handleLogout}>Logout</Button>
        <Avatar
            src={avatar}
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%', 
              bgcolor: theme.palette.grey[300], 
            }}
          >
           
          </Avatar>
        </Box>
       
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
