import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({
        title: '',
        description: '',
        image_url: '',
        link: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = () => {
        axios.get('http://localhost:5000/api/projects')
            .then(response => setProjects(response.data))
            .catch(error => console.error('Ошибка при загрузке проектов:', error));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProject({ ...newProject, [name]: value });
        setErrors({ ...errors, [name]: null });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Создаем локальное превью
        const imageUrl = URL.createObjectURL(file);
        setNewProject({ ...newProject, image_url: imageUrl });
        setImageFile(file);

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('http://localhost:5000/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setNewProject({ ...newProject, image_url: response.data.imageUrl });
        } catch (error) {
            console.error('Ошибка при загрузке изображения:', error);
            alert('Не удалось загрузить изображение. Попробуйте еще раз.');
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!newProject.title) newErrors.title = 'Название обязательно';
        if (!newProject.link) {
            newErrors.link = 'Ссылка обязательна';
        } else if (!/^https?:\/\/.+/.test(newProject.link)) {
            newErrors.link = 'Введите корректную ссылку (начинается с http:// или https://)';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const addProject = () => {
        if (!validateForm()) return;

        axios.post('http://localhost:5000/api/projects', newProject)
            .then(() => {
                fetchProjects();
                setNewProject({ title: '', description: '', image_url: '', link: '' });
                setImageFile(null);
            })
            .catch(error => console.error('Ошибка при добавлении проекта:', error));
    };

    const deleteProject = (id) => {
        axios.delete(`http://localhost:5000/api/projects/${id}`)
            .then(() => fetchProjects())
            .catch(error => console.error('Ошибка при удалении проекта:', error));
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Панель администратора</h1>

            {/* Форма для добавления нового проекта */}
            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <h2 className="card-title">Добавить проект</h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Название</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={newProject.title}
                                onChange={handleInputChange}
                                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                required
                            />
                            {errors.title && <div style={{ color: 'red', fontSize: '0.875em' }}>{errors.title}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Описание</label>
                            <textarea
                                id="description"
                                name="description"
                                value={newProject.description}
                                onChange={handleInputChange}
                                className="form-control"
                                rows="3"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Загрузить изображение</label>
                            <input
                                type="file"
                                id="image"
                                onChange={handleImageUpload}
                                className="form-control"
                            />
                            {newProject.image_url && (
                                <img src={newProject.image_url} alt="Preview" style={{ width: '100px', marginTop: '10px' }} />
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="link" className="form-label">Ссылка на проект</label>
                            <input
                                type="text"
                                id="link"
                                name="link"
                                value={newProject.link}
                                onChange={handleInputChange}
                                className={`form-control ${errors.link ? 'is-invalid' : ''}`}
                                required
                            />
                            {errors.link && <div style={{ color: 'red', fontSize: '0.875em' }}>{errors.link}</div>}
                        </div>
                        <button
                            type="button"
                            onClick={addProject}
                            className="btn btn-success"
                            disabled={!newProject.title || !newProject.link || !newProject.image_url}
                        >
                            Добавить проект
                        </button>
                    </form>
                </div>
            </div>

            {/* Список проектов */}
            <h2 className="mb-4">Список проектов</h2>
            <ul className="list-group">
                {projects.map(project => (
                    <li key={project.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{project.title}</span>
                        <button onClick={() => deleteProject(project.id)} className="btn btn-danger btn-sm">
                            Удалить
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Admin;