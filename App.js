import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";

const options = [
  { value: "alphabets", label: "Alphabets" },
  { value: "numbers", label: "Numbers" },
  { value: "highestAlphabet", label: "Highest Alphabet" },
];

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredResponse, setFilteredResponse] = useState(null);
  const [error, setError] = useState("");

  // Handle JSON Input Change
  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  // Validate JSON and Call API
  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      if (!parsedData.data || !Array.isArray(parsedData.data)) {
        throw new Error("Invalid JSON format");
      }

      setError(""); // Clear previous errors

      // Call Backend API
      const response = await axios.post("http://localhost:5000/process", parsedData);
      setFilteredResponse(response.data);

    } catch (err) {
      setError("Invalid JSON Input. Please enter a valid JSON.");
    }
  };

  // Render Filtered Response
  const getFilteredResponse = () => {
    if (!filteredResponse) return null;

    let filteredData = [];

    if (selectedFilters.some((filter) => filter.value === "alphabets")) {
      filteredData.push(`Alphabets: ${filteredResponse.alphabets.join(", ")}`);
    }
    if (selectedFilters.some((filter) => filter.value === "numbers")) {
      filteredData.push(`Numbers: ${filteredResponse.numbers.join(", ")}`);
    }
    if (selectedFilters.some((filter) => filter.value === "highestAlphabet")) {
      filteredData.push(`Highest Alphabet: ${filteredResponse.highestAlphabet}`);
    }

    return filteredData.map((item, index) => <p key={index}>{item}</p>);
  };

  return (
    <div style={{ width: "500px", margin: "50px auto", textAlign: "center" }}>
      <h2>API Input</h2>
      <textarea
        rows="4"
        cols="50"
        value={jsonInput}
        onChange={handleInputChange}
        placeholder='{"data":["A","C","z"]}'
      />
      <br />
      <button onClick={handleSubmit} style={{ padding: "10px", marginTop: "10px" }}>Submit</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {filteredResponse && (
        <>
          <h3>Multi Filter</h3>
          <Select
            options={options}
            isMulti
            onChange={setSelectedFilters}
            value={selectedFilters}
          />
          <h3>Filtered Response</h3>
          {getFilteredResponse()}
        </>
      )}
    </div>
  );
};

export default App;
