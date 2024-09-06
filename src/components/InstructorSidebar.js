import React,{useState} from 'react'
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box,useTheme, Typography, Avatar } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import {Link} from 'react-router-dom'

const Sidebar = () => {
  const theme=useTheme()
  const [activeState,setActiveState]=useState('Assigned Course')

  const activeStyle={
    backgroundColor:theme.palette.primary.button,
    borderRadius:4,
    color:"white"

  }

  const defaultStyle = {
    color: theme.palette.primary.main 
  };

  const handleSelectItem=(i)=>{
    setActiveState(i)
  }
  return (
    <Drawer
    variant='permanent'
    sx={{width:250,flexShrink:0, [`& .MuiDrawer-paper`]: {
      width: 240, 
      boxSizing: 'border-box',
      width:240,
      backgroundColor: 'white', 
      color: theme.palette.primary.main ,
      height: '100vh', 
      boxShadow:3
     
    }}}
    >
      <Box>
        <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",marginTop:"1rem"}}>
          <Typography>Instructor</Typography>
          <Avatar/>
        </Box>
      <Box  sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',marginX:2 }}>
        <List>
          {[
           
            {text:'Assigned Course',icon:<GroupAddOutlinedIcon/>,path:'/instructor-dashboard/assignedCourse'},
            {text:'Lessons',icon:<MenuBookIcon/>,path:'/instructor-dashboard/lessons'},
            {text:'Quiz',icon:<MenuBookIcon/>,path:'/instructor-dashboard/quiz'},
            
          ].map(({text,icon,path})=>(
            <ListItem
            button
            key={text}
            component={Link}
            to={path}
            selected={activeState==text}
            onClick={()=>handleSelectItem(text)}
            sx={{
              cursor:"pointer",
              ...(activeState===text ? activeStyle:defaultStyle),
              '&:hover':{
                backgroundColor:activeState===text?theme.palette.primary.hover:{}
              }
            }}
            >
              <ListItemIcon>
                {icon}
              </ListItemIcon>
              <ListItemText  primary={text}/>

            </ListItem>
          ))
          }
        </List>
      </Box>
      </Box>
    </Drawer>
  )
}

export default Sidebar
