# 🚀 MERN Project Management System

A robust, full-stack project management platform featuring role-based access control (RBAC) for Admins, Clients, and Users.

# Netlify link : https://ubiquitous-heliotrope-8a75b1.netlify.app/
# Deployed Link : https://project-management-portal-cn7a.onrender.com


## 📋 Table of Contents
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Setup Instructions](#-setup-instructions)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)

---

## ✨ Features

### 👑 Administrative Suite
- **Live Dashboard**: Real-time stats pulled from MongoDB using Aggregation Pipelines.
- **User Management**: Complete CRUD for managing roles and system access.
- **Client Tracking**: Specialized management for business accounts.
- **System Reports**: Automated summary generation with **CSV Export** (using `@json2csv/plainjs`).
- **Global Settings**: Administrative security and profile controls.

### 💼 Client & User Portals
- **Project Overviews**: Clients can view and track their specific projects.
- **Personal Profiles**: Users can update information, change passwords, and manage avatars.

---

## 🛠️ Tech Stack

- **Frontend**: React (Context API), Tailwind CSS, Lucide Icons, Axios.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB & Mongoose.
- **Authentication**: JSON Web Tokens (JWT) & Bcrypt.js.
- **Utilities**: `@json2csv/plainjs` for data reporting.

---

## ⚙️ Setup Instructions

### 1. Prerequisites
- Node.js installed
- MongoDB Atlas account or local MongoDB instance

### 2. env inputs
MONGOURL = ******
JWT_SECRET = ******
PORT = ****

### 2. Backend Installation
```bash
cd backend
npm install

### 2. Frontend Installation
```bash
cd frontend
npm install