import React, { useState, useEffect } from 'react';
import SpecialistCard from '../components/SpecialistCard';
import AppointmentForm from '../components/AppointmentForm';
import api from '../services/api';

const Specialists = () => {
    const [specialists, setSpecialists] = useState([]);
    const [selectedSpecialist, setSelectedSpecialist] = useState(null);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        fetchSpecialists();
    }, []);

    const fetchSpecialists = async () => {
        try {
            const response = await api.get('/specialists');
            setSpecialists(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке специалистов:', error);
        }
    };

    const handleSelectSpecialist = (specialist) => {
        setSelectedSpecialist(specialist);
    };

    const handleCreateAppointment = async (appointmentData) => {
        try {
            await api.post('/appointments', appointmentData);
            setNotification({
                type: 'success',
                message: 'Запись успешно создана! Мы отправили подтверждение на ваш email.'
            });
            setSelectedSpecialist(null);
            setTimeout(() => setNotification(null), 5000);
        } catch (error) {
            setNotification({
                type: 'error',
                message: 'Ошибка при создании записи. Попробуйте еще раз.'
            });
            setTimeout(() => setNotification(null), 5000);
        }
    };

    const handleCancelForm = () => {
        setSelectedSpecialist(null);
    };

    return (
        <div className="app-container">
            <div className="sidebar">
                <h2 className="section-title">
                    <i className="fas fa-user-md"></i>
                    Специалисты
                </h2>
                <p>Выберите специалиста для записи на прием</p>
                
                {specialists.map(specialist => (
                    <SpecialistCard 
                        key={specialist._id} 
                        specialist={specialist} 
                        onSelect={handleSelectSpecialist}
                    />
                ))}
            </div>
            
            <div className="main-content">
                {notification && (
                    <div className={`notification notification-${notification.type}`}>
                        <i className={`fas ${notification.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                        {notification.message}
                    </div>
                )}
                
                {selectedSpecialist ? (
                    <AppointmentForm 
                        specialist={selectedSpecialist}
                        onSubmit={handleCreateAppointment}
                        onCancel={handleCancelForm}
                    />
                ) : (
                    <div className="empty-state">
                        <i className="fas fa-hand-point-left"></i>
                        <h3>Выберите специалиста</h3>
                        <p>Выберите специалиста из списка слева для записи на прием</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Specialists;