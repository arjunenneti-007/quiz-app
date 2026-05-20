import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  // START QUIZ
  const startQuiz = () => {
    navigate("/quiz");
  };

  // VIEW RESULTS
  const viewResults = () => {
    navigate("/result");
  };

  // LOGOUT
  const handleLogout = async () => {
    const username = localStorage.getItem("username");

    try {
      // DELETE USER FROM DATABASE
      await axios.delete(`http://localhost:8082/api/auth/delete/${username}`);

      // CLEAR LOCAL STORAGE
      localStorage.removeItem("username");
      localStorage.removeItem("currentResult");

      alert("Logged out successfully");

      // GO TO LOGIN PAGE
      navigate("/");
    } catch (error) {
      console.error(error);

      alert("Logout failed");
    }
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h1>Welcome to Quiz App</h1>

        <p>Test your knowledge with our online quiz.</p>

        <button onClick={startQuiz}>Start Quiz</button>

        <button onClick={viewResults}>View Results</button>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
