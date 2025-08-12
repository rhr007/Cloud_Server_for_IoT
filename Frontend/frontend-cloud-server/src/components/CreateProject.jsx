import React, { useState } from 'react'

import styles from '../components/CreateProject.module.css'
import HomePageNavbar from './HomePageNavbar';
import axios from 'axios';
import URL from '../URL';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
    const serverURL = URL();
    const [token, setToken] = useState(sessionStorage.getItem('cloud-token') || "")
    const navigate = useNavigate();
    let project_id = 0;

    const [title, setTitle] = useState("")
    const [number_of_sensors, setNumber_of_sensors] = useState(0)
    const [numberOfInputs, setNumberOfInputs] = useState([])
    const [sensorNames, setSensorNames] = useState([])
    const [dataTypes, setDataTypes] = useState([]);

    function handleSensorInput(e) {
        setNumber_of_sensors(e.target.value);
        const generateArrays = Array.from(Array(Number(e.target.value)).keys())
        setNumberOfInputs(generateArrays)

    }

    const handleSensorChange = (index, value) => {
        const updatedSensorNames = [...sensorNames];
        updatedSensorNames[index] = value; // Update the specific index
        setSensorNames(updatedSensorNames);
    };
    const handleDataType = (index, value) => {
        const updatedSensorNames = [...dataTypes];
        updatedSensorNames[index] = value; // Update the specific index
        setDataTypes(updatedSensorNames);
    };

    function newProject(e) {
        e.preventDefault();

        const projectData = {
            title: title,
            number_of_sensors: number_of_sensors,
            name_of_sensors: sensorNames,
            data_type_of_sensors: dataTypes,
            created: 2024
        }

        axios.post(`${serverURL}/project/`, projectData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                if (response.status == 201) {
                    project_id = response.data.id
                    sensorNames.map((sensor, index) => {
                        let sensorData = {
                            name: sensor,
                            data_type: dataTypes[index],
                            project_id: project_id
                        }
                        axios.post(`${serverURL}/project/sensors`, sensorData, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        }).then(response => console.log(response))
                            .catch((error) => console.log(error))
                    })

                    alert("Project Created Successfully")
                    navigate('/dashboard')
                }
            }).catch((e) => {
                navigate('/signin')
            })
    }

    // function test(){
    //     sensorNames.map((sensor, index) => {
    //         let sensorData = {
    //             name: sensor,
    //             data_type: dataTypes[index],
    //             project_id: 3
    //         }
    //         axios.post(`${serverURL}/project/sensors`, sensorData, {
    //             headers: {
    //                 'Authorization': `Bearer ${token}`
    //             }
    //         }).then(response => console.log(response))
    //         .catch((error) => console.log(error))
    //     })
    // }
    return (
        <>

            <HomePageNavbar />
            <h3>Create New Project With Multiple Sensors</h3>
            <div className={styles.mainContainer}>
                <form onSubmit={newProject}>
                    <input type="text" placeholder='Project Title' required onChange={(e) => setTitle(e.target.value)} />
                    <input type="number" placeholder='Number Of Sensors' required onChange={(e) => handleSensorInput(e)} />
                    {numberOfInputs.map((i) => (
                        <div key={i}>
                            <input required type='text' placeholder='Name of Your Sensor' onChange={(e) => handleSensorChange(i, e.target.value)} />
                            <select required onChange={(e) => handleDataType(i, e.target.value)}>
                                <option value="">Data Type</option>
                                <option value="Number">Number</option>
                                <option value="Image" >Image</option>
                                <option value="Video" disabled>Video</option>
                            </select>

                        </div>
                    ))}
                    <input type="submit" value='Create Project' className={styles.submitButton} />
                </form>
            </div>

        </>
    );
}

export default CreateProject;