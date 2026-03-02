import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="main-content">
            <h2 className="section-title">
                <i className="fas fa-home"></i>
                Добро пожаловать в MedBook
            </h2>
            
            <p style={{ marginBottom: '20px', lineHeight: '1.6' }}>
                MedBook - это современная система онлайн-записи к специалистам. 
                Здесь вы можете легко записаться на прием к врачу, отследить свои записи 
                и управлять ими в удобном интерфейсе.
            </p>
            
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <Link to="/specialists" className="btn btn-primary">
                    <i className="fas fa-user-md"></i> Выбрать специалиста
                </Link>
                <Link to="/appointments" className="btn btn-outline">
                    <i className="fas fa-calendar-alt"></i> Мои записи
                </Link>
            </div>
            
            <div className="stats" style={{ marginTop: '40px' }}>
                <div className="stat-card">
                    <div className="stat-value">15</div>
                    <div className="stat-label">Специалистов</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">1200+</div>
                    <div className="stat-label">Записей в месяц</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">98%</div>
                    <div className="stat-label">Довольных пациентов</div>
                </div>
            </div>
        </div>
    );
};

export default Home;