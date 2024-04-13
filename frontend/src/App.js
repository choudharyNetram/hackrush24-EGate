import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; 
import SignupStudent from './components/SignupStudent'; 
import HomePage from './components/Homepage'; 
import LoginStudent from './components/LoginStudent'; 
import StudentProfile from './components/StudentProfile'; 
import FacultyProfile from './components/FacultyProfile'; 

function App() {
  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/signupstudent" element={<SignupStudent />} />
          <Route path="/loginstudent" element={<LoginStudent />} />
          <Route path="/studentprofile" element={<StudentProfile />} />
          <Route path="/facultyprofile" element={<FacultyProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
