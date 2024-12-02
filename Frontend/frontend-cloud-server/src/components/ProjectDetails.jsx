import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import HomePageNavbar from './HomePageNavbar';
import axios from 'axios';
import URL from '../URL';
const ProjectDetails = () => {
    const { id } = useParams();
    const [writeAPI, setWriteAPI] = useState("")
    const serverURL = URL()
    useEffect(() => {
        axios.get(`${serverURL}/sensor-data/${id}/sensor_keys`).then(res => setWriteAPI(`${serverURL}${res.data}`))
    }, [])
  return (
    <>
        <HomePageNavbar />

        <div>Write API Key: {writeAPI}</div>
    </>
  )
}

export default ProjectDetails