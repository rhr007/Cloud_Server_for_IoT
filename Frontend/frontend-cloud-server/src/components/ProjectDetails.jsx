import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HomePageNavbar from "./HomePageNavbar";
import axios from "axios";
import URL from "../URL";
import styles from "./ProjectDetails.module.css";
import DataTable from "./DataTable.jsx";
import DataGraph from "./DataGraph.jsx";

const crops = [
  "rice",
  "maize",
  "chickpea",
  "kidneybeans",
  "pigeonpeas",
  "mothbeans",
  "mungbean",
  "blackgram",
  "lentil",
  "pomegranate",
  "banana",
  "mango",
  "grapes",
  "watermelon",
  "muskmelon",
  "apple",
  "orange",
  "papaya",
  "coconut",
  "cotton",
  "jute",
  "coffee",
];

const sensorKeyLabels = {
  temperature: "Temperature (°C)",
  humidity: "Humidity (%)",
  ph: "Soil pH",
  K: "Potassium (K)",
  P: "Phosphorus (P)",
  N: "Nitrogen (N)",
  rainfall: "Rainfall",
};

const ProjectDetails = () => {
  const { id } = useParams();
  const [writeAPI, setWriteAPI] = useState("");
  const [projectData, setProjectData] = useState();
  const [predictedCrop, setPredictedCrop] = useState(null);
  const [soilGuide, setSoilGuide] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState("");

  const serverURL = URL();

  useEffect(() => {
    axios
      .get(`${serverURL}/data/${id}/sensor_keys`)
      .then((res) => setWriteAPI(`${serverURL}${res.data}`));

    axios
      .get(`${serverURL}/project/sensors/${id}`)
      .then((res) => setProjectData(res.data));
  }, []);

  // Predict Crop API
  const handlePredict = async () => {
    try {
      const res = await axios.get(`${serverURL}/predict_crop/${id}`);
      setPredictedCrop(res.data);
      setSoilGuide(null); // hide guide if switching
    } catch (err) {
      console.error(err);
    }
  };

  // Soil Preparation API
  const handleSoilPrep = async () => {
    if (!selectedCrop) {
      alert("Please select a crop before getting the soil preparation guide!");
      return;
    }
    try {
      const res = await axios.get(
        `${serverURL}/prep_soil/${id}/${selectedCrop}`
      );
      setSoilGuide(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Soil Preparation API
  // const handleSoilPrep = async () => {
  //   try {
  //     if (!predictedCrop?.predicted_crop) return alert("Please predict crop first!");
  //     const cropName = predictedCrop.predicted_crop;
  //     const res = await axios.get(`${serverURL}/prep_soil/${id}/${cropName}`);
  //     setSoilGuide(res.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <div>
      <HomePageNavbar />

      <div className="p-4">
        <div className="mb-4 text-sm">
          Write API Key: <pre>{writeAPI}</pre>
        </div>

        {projectData ? (
          <div>
            <h1 className="text-2xl font-bold">{projectData.title}</h1>
            <p className="mb-6">
              Number of Sensors: {projectData.number_of_sensors}
            </p>

            {/* button section 2 */}
            <div className="flex flex-wrap gap-6 mb-8 w-full">
              <button
                onClick={handlePredict}
                className="inline-flex items-center gap-3 bg-blue-700 text-blue-500 px-8 py-4 rounded-xl shadow-md hover:shadow-blue-600/70 hover:bg-blue-800 transition-all font-semibold min-w-[300px] min-h-[41px] text-base"
                style={{ whiteSpace: "nowrap" }}
              >
                🌱 <span>Predict Best Crop</span>
              </button>
              {/* Crop Selector */}

              <select
                id="cropSelect"
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="mb-4 px-4 py-2 border border-gray-300 rounded-lg w-full min-w-[220px] min-h-[39px]"
              >
                <option value="">-- Choose a crop --</option>
                {crops.map((crop) => (
                  <option key={crop} value={crop}>
                    {crop.charAt(0).toUpperCase() + crop.slice(1)}
                  </option>
                ))}
              </select>
              <button
                onClick={handleSoilPrep}
                className="inline-flex items-center gap-3 bg-green-700 text-blue-500 px-8 py-4 rounded-xl shadow-md hover:shadow-green-600/70 hover:bg-green-800 transition-all font-semibold min-w-[300px] min-h-[41px] text-base"
                style={{ whiteSpace: "nowrap" }}
              >
                🪴 <span>Soil Preparation Guide</span>
              </button>
            </div>

            {/* Prediction Result */}
            {predictedCrop && (
              <div className="bg-white shadow-lg rounded-xl p-6 mb-8 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-700 mb-2">
                  Predicted Crop:{" "}
                  <span className="text-blue-700">
                    {predictedCrop.predicted_crop.toUpperCase()}
                  </span>
                </h2>

                {/* Add this subtitle for current data */}
                <p className="mb-4 text-gray-500 italic text-sm">
                  Current Sensor Data Used for Prediction:
                </p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  {Object.entries(predictedCrop.sensor_data_used).map(
                    ([key, value]) => (
                      <div key={key} className="bg-gray-50 p-3 rounded border">
                        <strong className="capitalize">
                          {/* Use label mapping or fallback to raw key */}
                          {sensorKeyLabels[key] || key}:
                        </strong>{" "}
                        {value}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* // Similarly, in soilGuide section, if you want to rename keys of guidelines (if applicable): */}
            {soilGuide && (
              <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 mb-8">
                <h2 className="text-xl font-bold text-green-700 mb-4">
                  Soil Preparation for {soilGuide.crop.toUpperCase()}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(soilGuide.guidelines).map(
                    ([key, guideline]) => (
                      <div
                        key={key}
                        className="bg-green-50 p-3 rounded border border-green-200 text-sm"
                      >
                        <strong className="capitalize">
                          {sensorKeyLabels[key] || key}:
                        </strong>{" "}
                        {guideline}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Sensors Layout */}
            <div className={styles.tableGraph}>
              {projectData.sensors.map((sensor) => (
                <div className={styles.sensorContainer} key={sensor.id}>
                  <h3>{sensor.name}</h3>
                  <div className={styles.sensorContent}>
                    <div className={styles.tableContainer}>
                      <DataTable sensorID={sensor.id} />
                    </div>
                    <div className={styles.graphContainer}>
                      <DataGraph
                        sensorID={sensor.id}
                        sensorName={sensor.name}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>loading...</p>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
