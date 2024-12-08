import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import URL from '../URL';
import styles from './DataGraph.module.css'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import axios from 'axios';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


const DataGraph = (props) => {
    const serverURL = URL();
    const [sensorData, setSensorData] = useState([]);
    const [timeStamp, setTimeStamp] = useState([]);
    const [values, setValues] = useState([]);

    useEffect(() => {
        axios.get(`${serverURL}/data/graph/${props.sensorID}?n=100`)
            .then((res) => {
                setSensorData(res.data);
                setTimeStamp(res.data.map((item) => new Date(item.time).toLocaleString()));
                setValues(res.data.map((item) => item.value));
            });
    }, [])





    const chartData = {
        labels: timeStamp,
        datasets: [
            {
                label: props.sensorName,
                data: values,
                backgroundColor: 'yellow',
                borderColor: "blue",
                fill: false
            }
        ]
    }
    return (
        <div>
            {sensorData ? (
                <Line data={chartData} className={styles.graphDesign} />

            ) : <p>Loading</p>}
        </div>
    );
}

export default DataGraph;