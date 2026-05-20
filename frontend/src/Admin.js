import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

function Admin({ setUser }) {
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState({
    questionText: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
  });

  // Load questions
  const loadQuestions = () => {
    axios
      .get("http://localhost:8082/questions")
      .then((res) => setQuestions(res.data));
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add question
  const addQuestion = () => {
    axios.post("http://localhost:8082/admin/add", form).then(() => {
      loadQuestions();
      alert("Question added!");
    });
  };

  // Delete question
  const deleteQuestion = (id) => {
    axios
      .delete(`http://localhost:8082/admin/delete/${id}`)
      .then(() => loadQuestions());
  };

  return (
    <div className="admin-container">
      {/* 🔥 LOGOUT BUTTON */}
      <button onClick={() => setUser(null)}>Logout</button>

      <h2>Admin Panel</h2>

      {/* Form */}
      <div className="form">
        <input
          name="questionText"
          placeholder="Question"
          onChange={handleChange}
        />
        <input name="optionA" placeholder="Option A" onChange={handleChange} />
        <input name="optionB" placeholder="Option B" onChange={handleChange} />
        <input name="optionC" placeholder="Option C" onChange={handleChange} />
        <input name="optionD" placeholder="Option D" onChange={handleChange} />
        <input
          name="correctAnswer"
          placeholder="Correct Answer"
          onChange={handleChange}
        />

        <button onClick={addQuestion}>Add Question</button>
      </div>

      {/* Questions */}
      <div>
        {questions.map((q) => (
          <div key={q.id} className="card">
            <h4>{q.questionText}</h4>
            <button onClick={() => deleteQuestion(q.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
