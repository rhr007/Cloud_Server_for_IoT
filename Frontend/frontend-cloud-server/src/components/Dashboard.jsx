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
                    console.log(response.status);

                }
            })
            .catch(error => {
                // console.log(error);
                navigate('/signin')
            })
        }
    }, [])
  return (
    <div className={styles.mainContainer}>

        <HomePageNavbar />
        <div className={styles.projectContainer}>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum quas consequuntur ex cumque nostrum provident nisi beatae temporibus excepturi accusamus alias aliquam error ea quia doloremque officiis, voluptatibus molestiae impedit.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum quas consequuntur ex cumque nostrum provident nisi beatae temporibus excepturi accusamus alias aliquam error ea quia doloremque officiis, voluptatibus molestiae impedit.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum quas consequuntur ex cumque nostrum provident nisi beatae temporibus excepturi accusamus alias aliquam error ea quia doloremque officiis, voluptatibus molestiae impedit.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum quas consequuntur ex cumque nostrum provident nisi beatae temporibus excepturi accusamus alias aliquam error ea quia doloremque officiis, voluptatibus molestiae impedit.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum quas consequuntur ex cumque nostrum provident nisi beatae temporibus excepturi accusamus alias aliquam error ea quia doloremque officiis, voluptatibus molestiae impedit.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum quas consequuntur ex cumque nostrum provident nisi beatae temporibus excepturi accusamus alias aliquam error ea quia doloremque officiis, voluptatibus molestiae impedit.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum quas consequuntur ex cumque nostrum provident nisi beatae temporibus excepturi accusamus alias aliquam error ea quia doloremque officiis, voluptatibus molestiae impedit.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum quas consequuntur ex cumque nostrum provident nisi beatae temporibus excepturi accusamus alias aliquam error ea quia doloremque officiis, voluptatibus molestiae impedit.</p>
        </div>
        

    
    </div>
  );
}

export default Dashboard;