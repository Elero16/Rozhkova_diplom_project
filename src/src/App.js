import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Admin from './Admin';

function App() {
    return (
        <Router>
            <div>
                {/* Навигационное меню */}
                <nav style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
                    <Link to="/" style={{ marginRight: '10px', textDecoration: 'none', color: 'blue' }}>Главная</Link>
                    <Link to="/admin" style={{ textDecoration: 'none', color: 'blue' }}>Админка</Link>
                </nav>

                {/* Маршруты */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;