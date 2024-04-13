import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; 
import SignupStudent from './components/SignupStudent'; 
import HomePage from './components/Homepage'; 
import LoginStudent from './components/LoginStudent'; 
import StudentProfile from './components/StudentProfile'; 

function App() {
  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/signupstudent" element={<SignupStudent />} />
          <Route path="/loginstudent" element={<LoginStudent />} />
          <Route path="/studentprofile" element={<StudentProfile />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
