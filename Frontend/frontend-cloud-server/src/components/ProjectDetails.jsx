import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import HomePageNavbar from './HomePageNavbar';
import axios from 'axios';
import URL from '../URL';
import styles from './ProjectDetails.module.css'
import client from "../client"
import SensorTable from './SensorTable';
import DataTable from './DataTable.jsx';
import DataGraph from './DataGraph.jsx';
const ProjectDetails = () => {
  const { id } = useParams();
  const [writeAPI, setWriteAPI] = useState("");
  const [projectData, setProjectData] = useState();
  const [sensorData, setSensorData] = useState([]);


  // const [project, setProject] = useState("")


  const serverURL = URL()
  useEffect(() => {

    axios.get(`${serverURL}/data/${id}/sensor_keys`).then(res => setWriteAPI(`${serverURL}${res.data}`))

    axios.get(`${serverURL}/project/sensors/${id}`)
      .then((res) => {
        setProjectData(res.data);
      });

  }, [])

  // useEffect(() => {
  //   client.get(`/sensor-data/all/${id}`).then(res => setProject(res.data))
  //   console.log(project);
  // }, [])

  function test() {
    axios.get(`${serverURL}/data/4`).
      then((res) => {
        // setSensorData(res.data)
        console.log(res.data[1].value);
      })
  }

  function tests(a) {
    console.log(a);
  }

  return (
    <div>
      <HomePageNavbar />
      <div>
        Write API Key: <pre>{writeAPI}</pre>
        <hr />
      </div>

      {projectData ?
        (<div>
          <h1>{projectData.title}</h1>
          <p>Number of Sensors: {projectData.number_of_sensors}</p>

          {/* <div className={styles.tableGraph}>
            {projectData.sensors.map((sensor) => (
              <div className={styles.tables} key={sensor.id}>
                <h3>{sensor.name}</h3>
                <DataTable sensorID={sensor.id} className={styles.tableContainer} />
                <DataGraph sensorID={sensor.id} className={styles.tableContainer} />
              </div>
            ))}
          </div> */}



          <div className={styles.tableGraph}>
            {projectData.sensors.map((sensor) => (
              <div className={styles.sensorContainer} key={sensor.id}>
                <h3>{sensor.name}</h3>
                <div className={styles.sensorContent}>
                  <div className={styles.tableContainer}>
                    <DataTable sensorID={sensor.id} />
                  </div>
                  <div className={styles.graphContainer}>
                    <DataGraph sensorID={sensor.id} sensorName={sensor.name} />
                  </div>
                </div>
              </div>
            ))}
          </div>




        </div>
        ) :
        <p>loading...</p>
      }
    </div>
  )
}

export default ProjectDetails


// {project && <div>
//   <div>
//     <h1>{project.title}</h1>
//     <h5>Number of sensors: {project.sensors.length}</h5>
//   </div>

//   {/* sensors table */}
//   <div className="d-flex" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
//     {project.sensors.map(sensor => {
//       return (
//         <SensorTable key={sensor.id} id={sensor.id} name={sensor.name} />
//       )
//     })}
//   </div>
// </div>}
