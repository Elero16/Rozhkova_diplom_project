import React, { useState } from 'react';

const AppointmentForm = ({ specialist, onSubmit, onCancel }) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [service, setService] = useState('');
    const [patientName, setPatientName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            specialistId: specialist._id,
            date,
            time,
            service,
            patientName,
            phone,
            email
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3 className="section-title">
                <i className="fas fa-user-md"></i>
                Запись к {specialist.name}
            </h3>
            
            <div className="form-group">
                <label>Выберите дату</label>
                <input 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            
            <div className="form-group">
                <label>Выберите время</label>
                <input 
                    type="time" 
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                />
            </div>
            
            <div className="form-group">
                <label>Услуга</label>
                <select 
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    required
                >
                    <option value="">Выберите услугу</option>
                    <option value="Первичный прием">Первичный прием</option>
                    <option value="Повторный прием">Повторный прием</option>
                    <option value="Консультация">Консультация</option>
                    <option value="Диагностика">Диагностика</option>
                </select>
            </div>
            
            <div className="form-group">
                <label>Ваше имя</label>
                <input 
                    type="text" 
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Введите ваше имя"
                    required
                />
            </div>
            
            <div className="form-group">
                <label>Телефон</label>
                <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Введите номер телефона"
                    required
                />
            </div>
            
            <div className="form-group">
                <label>Email</label>
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Введите email"
                    required
                />
            </div>
            
            <div className="form-group">
                <button type="submit" className="btn btn-primary">
                    <i className="fas fa-calendar-plus"></i> Записаться
                </button>
                <button type="button" className="btn btn-outline" onClick={onCancel}>
                    <i className="fas fa-times"></i> Отмена
                </button>
            </div>
        </form>
    );
};

export default AppointmentForm;