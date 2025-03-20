import { useState } from "react";
import api from "../api.js"; 

const PredictionForm = () => {
  const featureNames = [
    "age", "sex", "cp", "trtbps", "chol", "fbs", "rest_ecg", "thalachh", "exng",
    "oldpeak", "slope", "ca", "thall", "hypertension", "smoking_history", 
    "bmi", "HbA1c_level", "blood_glucose_level"
  ];

  const [features, setFeatures] = useState(Array(featureNames.length).fill(""));
  const [result, setResult] = useState(null);

  const handleChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert input array to key-value format
      const data = {};
      featureNames.forEach((name, index) => {
        data[name] = Number(features[index]);
      });

      const response = await api.post("/predict", data); // Use Axios instance
      setResult(response.data); // Set full response object
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", textAlign: "center" }}>
      <h2>Heart & Diabetes Prediction</h2>
      <form onSubmit={handleSubmit}>
        {featureNames.map((name, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", fontWeight: "bold" }}>{name}:</label>
            <input
              type="number"
              value={features[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={`Enter ${name}`}
              required
              style={{ padding: "8px", width: "100%" }}
            />
          </div>
        ))}
        <button type="submit" style={{ padding: "10px", marginTop: "10px", cursor: "pointer" }}>
          Predict
        </button>
      </form>

      {result && (
        <div style={{ marginTop: "20px", fontWeight: "bold" }}>
          <h3>Predictions:</h3>
          <p>Heart Disease: {result.heart_disease_prediction === 1 ? "Positive" : "Negative"}</p>
          <p>Diabetes: {result.diabetes_prediction === 1 ? "Positive" : "Negative"}</p>
        </div>
      )}
    </div>
  );
};

export default PredictionForm;
