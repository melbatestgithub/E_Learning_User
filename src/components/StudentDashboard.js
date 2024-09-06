import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './Navbar';
import { Box } from '@mui/material';
import Sidebar from './StudentSidebar'
import Courses from '../pages/students/Courses' 
import Lesson from '../pages/students/Lesson';
import MyCourse from '../pages/students/MyCourse';

function StudentDashboard() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <Box sx={{ display: 'flex',gap:3 }}>
      {!isLoginPage && <Sidebar />} 
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default' }}
      >
        {!isLoginPage && <Navbar />} 
        <Routes>
          <Route path='/courses' element={<Courses/>}/>
          <Route path='/lessons/:courseId' element={<Lesson/>}/>
          <Route path='/myCourse' element={<MyCourse/>}/>
        </Routes>
      </Box>
    </Box>
  );
}

export default StudentDashboard