# Quiz-App

## Description

This is a full-stack quiz application built using React.js (frontend) and Spring Boot (backend).  
The application allows users to register, login, attempt quizzes, and view their individual results.  
All quiz data and results are stored in a MySQL database.

---

## Features

- User Registration and Login
- Professional UI Design
- Timed Online Quiz
- Questions fetched from Database
- Individual User Result Tracking
- Results stored in Database
- Logout Functionality
- Spring Boot REST APIs
- MySQL Database Integration

---

## Tech Stack

- Frontend: React.js
- Backend: Spring Boot
- Database: MySQL

---

# How to Run

## Backend

1. Open backend project
2. Configure MySQL in `application.properties`
3. Run Spring Boot application
4. Runs on: http://localhost:8082
5. or Directly run `BackendApplication.java`

## Frontend

1. Open frontend project folder
2. Run:
   npm install
   npm start
3. Runs on: http://localhost:3000

---

## Database

- Database Name: `quiz_app`

### Tables

- users
- questions
- results

---

## Functionalities

## User

- Register Account
- Login
- Start Quiz
- Submit Quiz
- View Results
- Logout

## Quiz

- Timer Based Quiz
- Multiple Choice Questions
- Automatic Score Calculation
- Questions loaded dynamically from Database

---

## API Endpoints

### Authentication

- `/api/auth/register`
- `/api/auth/login`
- `/api/auth/delete/{username}`

### Quiz

- `/api/quiz/questions`

### Results

- `/api/results/save`
- `/api/results/{username}`

---

## Author

Enneti Venkata Durga Arjun
