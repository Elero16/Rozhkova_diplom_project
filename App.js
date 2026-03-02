import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './styles.css';
import Header from './components/Header';
import Home from './pages/Home';
import Specialists from './pages/Specialists';
import Appointments from './pages/Appointments';

function App() {
    return (
        <Router>
            <div className="container">
                <Header />
                
                <nav className="nav">
                    <Link to="/" className="nav-link">Главная</Link>
                    <Link to="/specialists" className="nav-link">Специалисты</Link>
                    <Link to="/appointments" className="nav-link">Мои записи</Link>
                </nav>
                
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/specialists" element={<Specialists />} />
                    <Route path="/appointments" element={<Appointments />} />
                </Routes>
                
                <footer>
                    <p>Дипломный проект по Fullstack разработке | MedBook - Система онлайн-записи к специалисту</p>
                    <p>Стек: React + Node.js + MongoDB + Docker Compose</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;