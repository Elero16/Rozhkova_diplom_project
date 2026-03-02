import React, { useState, useEffect } from 'react';
import AppointmentList from '../components/AppointmentList';
import api from '../services/api';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchAppointments();
    }, [filter]);

    const fetchAppointments = async () => {
        try {
            const response = await api.get(`/appointments?filter=${filter}`);
            setAppointments(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке записей:', error);
        }
    };

    const handleCancelAppointment = async (id) => {
        try {
            await api.put(`/appointments/${id}/cancel`);
            fetchAppointments();
        } catch (error) {
            console.error('Ошибка при отмене записи:', error);
        }
    };

    const filteredAppointments = appointments.filter(app => {
        if (filter === 'all') return true;
        return app.status === filter;
    });

    return (
        <div className="main-content">
            <h2 className="section-title">
                <i className="fas fa-calendar-alt"></i>
                Мои записи
            </h2>
            
            <div className="filter-section">
                <button 
                    className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    Все записи
                </button>
                <button 
                    className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
                    onClick={() => setFilter('pending')}
                >
                    Ожидают подтверждения
                </button>
                <button 
                    className={`filter-btn ${filter === 'confirmed' ? 'active' : ''}`}
                    onClick={() => setFilter('confirmed')}
                >
                    Подтверждены
                </button>
                <button 
                    className={`filter-btn ${filter === 'cancelled' ? 'active' : ''}`}
                    onClick={() => setFilter('cancelled')}
                >
                    Отменены
                </button>
            </div>
            
            <AppointmentList 
                appointments={filteredAppointments} 
                onCancel={handleCancelAppointment}
            />
        </div>
    );
};

export default Appointments;