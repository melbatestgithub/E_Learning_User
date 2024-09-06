import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './Navbar';
import { Box, ThemeProvider } from '@mui/material';
import Sidebar from './InstructorSidebar'
import Lesson from '../pages/instructors/Lesson';
import AssignedCourse from '../pages/instructors/AssignedCourse';
import CreateQuiz from '../pages/instructors/Quiz';

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
         
          <Route path='/assignedCourse' element={<AssignedCourse/>}/>
          <Route path='/lessons' element={<Lesson/>}/>
          <Route path='/quiz' element={<CreateQuiz/>}/>
        </Routes>
      </Box>
    </Box>
  );
}

export default StudentDashboard