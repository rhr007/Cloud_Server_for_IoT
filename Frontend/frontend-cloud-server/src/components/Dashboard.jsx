import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import URL from '../URL'
import axios from 'axios'
import styles from '../components/Dashboard.module.css'
import HomePageNavbar from './HomePageNavbar'
import CreateProject from './CreateProject'




const Dashboard = () => {
    const [token, setToken] = useState(sessionStorage.getItem("cloud-token") || '')
    const navigate = useNavigate()
    const serverURL = URL()
    const [projects, setProjects] = useState([])

    useEffect(() => {
        if (!token) {
            navigate('/signin')
        }
        else {
            axios.get(`${serverURL}/users/me`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    if (response.status == 200) {
                        // console.log(typeof(response.data));
                        loadAllProjects();

                    }
                })
                .catch(error => {
                    // console.log(error);
                    navigate('/signin')
                })
        }
    }, [])


    function loadAllProjects() {
        axios.get(`${serverURL}/project/`, {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.status == 200) {
                    setProjects(response.data)

                }
            })
    }

    function goToProjectDetails(id) {
        console.log(id);
        navigate(`/project-details/${id}`)
    }


    return (
        <div className={styles.mainContainer}>

            <HomePageNavbar />
            <div className={styles.projectContainer}>
                <div className={styles.headline}>
                    <p>Your Project List</p>
                    <button onClick={() => navigate('/create-project')}>Create Project</button>
                </div>
                {projects.length > 0 ?
                    <>
                        {/* <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Project Key</th>
                                    <th>Number of Sensors</th>
                                    <th>Project Creation Date-Time</th>
                                </tr>
                            </thead>

                            <tbody>
                                {(projects).map((project) => (
                                    <tr key={project.id}>
                                        <td onClick={() => goToProjectDetails(project.id)}>{project.title}</td>
                                        <td>{project.project_key}</td>
                                        <td>{project.number_of_sensors}</td>
                                        <td>{project.created}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table> */}
                        {projects.map((project) => (
                            <div key={project.id} className={styles.projectDetailsInfor} onClick={() => goToProjectDetails(project.id)}>
                                <h4>{project.title}</h4>
                                <p>Project Key: {project.project_key}</p>
                                <p>Number of Sensors: {project.number_of_sensors}</p>
                                <p>Creation Date-Time: {new Date(project.created).toLocaleString()}</p>
                            </div>
                        ))}

                    </>
                    : <div> You have no projects to show</div>}
            </div>



        </div>
    );
}

export default Dashboard;