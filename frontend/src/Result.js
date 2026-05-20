import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Result.css";

function Result() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem("username");

    axios
      .get(`http://localhost:8082/api/results/${username}`)
      .then((response) => {
        setResults(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="result-container">
      <h1>My Results</h1>

      {results.map((result, index) => (
        <div className="result-card" key={index}>
          <h2>Score: {result.score}</h2>

          <p>Total Questions: {result.totalQuestions}</p>
        </div>
      ))}
    </div>
  );
}

export default Result;
