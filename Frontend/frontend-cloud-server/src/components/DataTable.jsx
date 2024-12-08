import React, { useEffect, useState } from 'react'
import axios from 'axios'
import URL from '../URL'
import styles from './DataTable.module.css'

const DataTable = (props) => {
    const serverURL = URL();
    const [sensorData, setSensorData] = useState([])
    useEffect(() => {

        axios.get(`${serverURL}/data/${props.sensorID}?n=10`)
            .then((res) => {
                setSensorData(res.data);
            })
    }, [])


    // useEffect(() => {
    //     const interval = setInterval(() => {

    //         axios.get(`${serverURL}/data/${props.sensorID}`)
    //             .then((res) => {
    //                 setSensorData(res.data);
    //             })
    //     }, 10000)
    //     return () => clearInterval(interval)
    // }, [])

    return (
        <div>
            {sensorData ? (
                <div>
                    <table className={styles.tableData}>
                        <thead>
                            <tr>
                                <th>10 Latest Values</th>
                                <th>Time Stamp</th>
                            </tr>
                        </thead>

                        <tbody>
                            {sensorData.map((data) => (
                                <tr key={data.id}>
                                    <td>{data.value}</td>
                                    <td>{new Date(data.time).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>) : <h1>Loading</h1>
            }
        </div >
    )
}

export default DataTable;