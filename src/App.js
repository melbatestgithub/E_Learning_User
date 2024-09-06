import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationPage from './pages/Register';
import LoginPage from './pages/Login';
import StudentDashboard from './components/StudentDashboard';
import InstructorDashboard from './components/InstructorDashboard';
import { Box, ThemeProvider } from '@mui/material';
import theme from './theme';
function AppContent() {
  return (  
  
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/student-dashboard/*" element={<StudentDashboard />} />
        <Route path="/instructor-dashboard/*" element={<InstructorDashboard />} />
      </Routes>
   
  );
}




function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppContent /> {/* This component uses useLocation */}
      </Router>
    </ThemeProvider>
  );
}
export default App;
