import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Home = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/projects')
            .then(response => setProjects(response.data))
            .catch(error => console.error('Ошибка при загрузке проектов:', error));
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Моё портфолио</h1>
            <motion.div
                className="row"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
                }}
            >
                {projects.map(project => (
                    <motion.div
                        key={project.id}
                        className="col-md-4 mb-4"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                    >
                        <div className="card h-100 shadow-sm">
                            {project.image_url && (
                                <img
                                    src={project.image_url}
                                    alt={project.title}
                                    className="card-img-top"
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                            )}
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{project.title}</h5>
                                <p className="card-text flex-grow-1">{project.description}</p>
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-auto">
                                    Посмотреть проект
                                </a>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default Home;