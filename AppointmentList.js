import React from 'react';

const AppointmentList = ({ appointments, onCancel }) => {
    if (appointments.length === 0) {
        return (
            <div className="empty-state">
                <i className="fas fa-calendar-alt"></i>
                <h3>Нет записей</h3>
                <p>У вас пока нет записей к специалистам</p>
            </div>
        );
    }

    const getStatusClass = (status) => {
        switch (status) {
            case 'confirmed': return 'status-confirmed';
            case 'pending': return 'status-pending';
            case 'cancelled': return 'status-cancelled';
            default: return '';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'confirmed': return 'Подтверждена';
            case 'pending': return 'Ожидает подтверждения';
            case 'cancelled': return 'Отменена';
            default: return status;
        }
    };

    return (
        <ul className="appointment-list">
            {appointments.map(appointment => (
                <li key={appointment._id} className="appointment-item">
                    <div className="appointment-icon">
                        <i className="fas fa-calendar-check"></i>
                    </div>
                    <div className="appointment-details">
                        <div className="appointment-title">
                            {appointment.service} к {appointment.specialistName}
                        </div>
                        <div className="appointment-meta">
                            <span><i className="far fa-calendar"></i> {new Date(appointment.date).toLocaleDateString()}</span>
                            <span><i className="far fa-clock"></i> {appointment.time}</span>
                            <span className={`status-badge ${getStatusClass(appointment.status)}`}>
                                {getStatusText(appointment.status)}
                            </span>
                        </div>
                        <div className="appointment-meta">
                            <span><i className="fas fa-user"></i> {appointment.patientName}</span>
                            <span><i className="fas fa-phone"></i> {appointment.phone}</span>
                        </div>
                    </div>
                    <div className="appointment-actions">
                        <button 
                            className="action-btn"
                            onClick={() => onCancel(appointment._id)}
                            disabled={appointment.status === 'cancelled'}
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default AppointmentList;