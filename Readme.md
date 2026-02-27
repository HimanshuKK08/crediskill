# 🚀 CrediSkill

CrediSkill is a Full Stack developer profiling platform focused on **skill validation and project-based credibility**, instead of traditional static portfolios.

The platform allows developers to showcase verified skills through tests and automatically analyzed GitHub projects.

> ⚙️ Currently under active development (MVP Phase)

---

## ✨ Problem Statement

Traditional portfolios only display claimed skills without verification.

CrediSkill aims to solve this by:
- Validating technical skills through assessments
- Tracking skill growth over time
- Analyzing real-world projects via GitHub repositories

---

## 🧠 Features Implemented So Far

### ✅ Authentication System
- Secure user registration & login
- Password hashing using bcrypt
- Session-based authentication using Passport.js

---

### ✅ Skill Management System
- Add / Update / Delete skills
- Skill level tracking
- Skill-based test system
- Weekly test restriction logic
- Score calculation & percentage-based evaluation
- Last tested tracking
- Tested / Not-tested state handling
- Edge case handling for null & new users

---

### ✅ Skill Assessment Engine
- Dynamic question fetching from database
- Randomized test generation
- Automatic evaluation
- Real-time score update in profile

---

### ✅ Developer Dashboard
- Profile management
- Skill cards with performance indicators
- Growth tracking schema
- Clean light-themed UI

---

### ✅ Project Analysis System (In Progress)
- GitHub repository link analysis
- Automatic tech stack detection using:
  - Repository languages
  - package.json dependencies
- Detected technologies mapped to user skills

---

## 🏗️ Tech Stack

**Frontend**
- React.js
- Tailwind CSS
- Context API

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- Passport.js

**APIs**
- GitHub REST API

---

## 📂 Project Structure
CrediSkill/
│
├── frontend/ → React Dashboard
├── backend/ → Express API
└── README.md

---

## ⚡ Current Status

🚧 MVP under active development

Upcoming Improvements:
- Project depth scoring
- Skill–Project intersection analysis
- Public profile sharing
- Deployment



## 👨‍💻 Author

**Himanshu Khandelwal**

---

## 📌 Note

This project is actively being built and improved.  
Architecture and features may evolve during development.