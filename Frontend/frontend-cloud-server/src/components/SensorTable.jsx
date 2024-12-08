import React, { useEffect, useState } from 'react'
import client from '../client'
import { Chart } from 'react-chartjs-2'
import { Chart as ChartJS, LineController, CategoryScale, LineElement, PointElement, LinearScale, Title } from 'chart.js';


const SensorTable = ({ id, name }) => {
    const [sensorData, setSensorData] = useState([])
    useEffect(() => {
        client.get(`/sensor-data/sensor/data/${id}`).then(
            res => setSensorData(res.data)
        )
    }, [])
    ChartJS.register(CategoryScale, LineController, LineElement, PointElement, LinearScale, Title);

    const labels = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul']

    const data = {
        lables: labels,
        // ["2024-12-03T02:00:03.876325", "2024-12-03T02:00:28.227681", "2024-12-03T02:27:03.200017", "2024-12-03T02:27:56.806134"],
        datasets: [
            {
                label: 'Dataset 1',
                fill: false,

                data: [65, 59, 80, 81, 56, 55, 40],
                borderColor: 'rgb(75, 192, 192)',
            },

        ],
    };
    const options = {
        responsive: true,
        plugins: {

            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
    };
    return (
        <div>
            <h1>{name}</h1>
            <Chart type='line' options={options} data={data} />
            {/* <table style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <td style={{ padding: '8px' }}>Time</td>
                        <td>Value</td>
                    </tr>

                </thead>
                {sensorData.map(data => {
                    return (
                        <tr key={data.id}>
                            <td>{new Date(data.time).toLocaleString()}</td>
                            <td>{data.value}</td>
                        </tr>
                    )
                })}
            </table> */}
        </div>
    )
}

export default SensorTable