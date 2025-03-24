import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Admin from './Admin';
import { FaHome, FaTools, FaMoon, FaSun } from 'react-icons/fa';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'light' : 'dark');
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">Portfolio</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <FaHome className="me-2" /> Главная
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin" className="nav-link">
                  <FaTools className="me-2" /> Админка
                </Link>
              </li>
            </ul>
            <button className="btn btn-outline-secondary" onClick={toggleTheme}>
              {isDarkMode ? <FaSun /> : <FaMoon />} Переключить тему
            </button>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;