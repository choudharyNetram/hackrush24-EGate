import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; 
import SignupStudent from './components/SignupStudent'; 
import HomePage from './components/Homepage'; 

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <p>This is header</p>
        </header>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/signupstudent" element={<SignupStudent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
