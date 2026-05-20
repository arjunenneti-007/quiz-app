import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(120);

  const navigate = useNavigate();

  // FETCH QUESTIONS
  useEffect(() => {
    axios
      .get("http://localhost:8082/api/quiz/questions")
      .then((res) => {
        console.log(res.data);

        setQuestions(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Error loading questions");
      });
  }, []);

  // TIMER
  useEffect(() => {
    if (timeLeft <= 0) {
      submitQuiz();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // HANDLE ANSWER
  const handleAnswer = (questionId, option) => {
    setAnswers({
      ...answers,
      [questionId]: option,
    });
  };

  // SUBMIT QUIZ
  const submitQuiz = async () => {
    let score = 0;

    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        score++;
      }
    });

    const username = localStorage.getItem("username");

    try {
      await axios.post("http://localhost:8082/api/results/save", {
        username: username,
        score: score,
        totalQuestions: questions.length,
      });
    } catch (error) {
      console.error(error);
      alert("Error saving result");
    }

    // SAVE RESULT LOCALLY
    const result = {
      username: username,
      score: score,
      total: questions.length,
      date: new Date().toLocaleString(),
    };

    localStorage.setItem("currentResult", JSON.stringify(result));

    alert(`Quiz Submitted!`);

    navigate("/home");
  };

  // LOGOUT
  const handleLogout = async () => {
    const username = localStorage.getItem("username");

    try {
      await axios.delete(`http://localhost:8082/api/auth/delete/${username}`);

      localStorage.removeItem("username");
      localStorage.removeItem("currentResult");

      alert("Logged out successfully");

      navigate("/");
    } catch (error) {
      console.error(error);

      alert("Logout failed");
    }
  };

  // TIMER FORMAT
  const minutes = Math.floor(timeLeft / 60);

  const seconds = timeLeft % 60;

  return (
    <div className="quiz-container">
      {/* HEADER */}
      <div className="quiz-header">
        <h1>Online Quiz</h1>

        <div className="header-right">
          <div className="timer">
            Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* QUESTIONS */}
      {questions.length === 0 ? (
        <p>Loading Questions...</p>
      ) : (
        questions.map((q, index) => (
          <div className="question-card" key={q.id}>
            <h2>
              {index + 1}. {q.question}
            </h2>

            <div className="options">
              <label>
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value={q.optionA}
                  onChange={() => handleAnswer(q.id, q.optionA)}
                />
                {q.optionA}
              </label>

              <label>
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value={q.optionB}
                  onChange={() => handleAnswer(q.id, q.optionB)}
                />
                {q.optionB}
              </label>

              <label>
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value={q.optionC}
                  onChange={() => handleAnswer(q.id, q.optionC)}
                />
                {q.optionC}
              </label>

              <label>
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value={q.optionD}
                  onChange={() => handleAnswer(q.id, q.optionD)}
                />
                {q.optionD}
              </label>
            </div>
          </div>
        ))
      )}

      {/* SUBMIT BUTTON */}
      <button className="submit-btn" onClick={submitQuiz}>
        Submit Quiz
      </button>
    </div>
  );
}

export default Quiz;
