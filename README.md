# Basic Authentication System

## Overview

This project is a simple authentication system that allows users to create an account and log in.
It demonstrates fundamental backend concepts such as password hashing, server-side validation, and database interaction.

The project is intended for learning and experimentation with authentication workflows in web applications.

---

## Tech Stack

Frontend

* React
* Tailwind CSS
* JavaScript

Backend

* Node.js
* Express.js

Database

* MongoDB

Security

* bcrypt password hashing

---

## Features

* User Signup
* User Login
* Password hashing using bcrypt
* MongoDB database storage
* Basic authentication workflow

---

## Project Structure

```
project-root
│
├── backend
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── signup.html
│   └── login.html
│
├── .gitignore
└── README.md
```

---

## Installation

Clone the repository

```
git clone <repo-url>
```

Install dependencies

```
npm install
```

Start the development server

```
npm run dev
```

Alternatively, you can start the server directly with

```
node server.js
```

---

## Future Improvements

* JWT authentication
* Session management
* Input validation
* Protected routes
* Email verification
* Password reset functionality

---

## Learning Goals

This project was built to understand the fundamentals of user authentication in full-stack applications.
