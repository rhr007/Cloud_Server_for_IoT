import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import URL from '../URL'
import axios from 'axios'
import styles from '../components/Dashboard.module.css'
import HomePageNavbar from './HomePageNavbar'




const Dashboard = () => {
    const [token, setToken] = useState(sessionStorage.getItem("cloud-token") || '')
    const navigate = useNavigate()
    const serverURL = URL()
    const [projects, setProjects] = useState([])
    let project;
    
    useEffect(() => {
        if(!token){
            navigate('/signin')
        }
        else{
            axios.get(`${serverURL}/users/me`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                if(response.status == 200)
                {
                    console.log(typeof(response.data));
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
            if(response.status == 200)
            {
                setProjects(response.data)
                
            }
        })
    }




  return (
    <div className={styles.mainContainer}>

        <HomePageNavbar />
        <div className={styles.projectContainer}>
            <div className={styles.headline}>
                <p>Your Project List</p>
                <button>Create Project</button>
            </div>
            <table>
                <th>Title</th>
                <th>Project Key</th>
                <th>Number of Sensors</th>
                <th>Project Creation Date-Time</th>
            </table>
        </div>
        

    
    </div>
  );
}

export default Dashboard;