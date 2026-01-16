
## 🎥 Demo Video
[Watch the demo video](https://github.com/yadavprateek-here/raw/main/assets/demo.mp4)


# L'Essence Resort & Spa – Hotel Website

A modern, premium hotel website built with **Angular** and **Firebase**, featuring a public-facing guest experience and a secure admin panel for hotel management.

This project is designed to be **cost-effective, scalable, and production-ready**, suitable for real hotel operations without maintaining a traditional backend server.

---

## ✨ Features

### 🌐 Guest Website
- Elegant, premium UI (desktop & mobile friendly)
- Rooms & Suites showcase
- Amenities and experiences
- Image gallery
- Booking request form
- Contact page

### 🧑‍💼 Admin Panel
- Secure admin login (Firebase Authentication)
- Role-based access control (Admin only)
- Manage rooms & suites (add / edit / delete)
- Manage amenities
- Manage gallery images
- Manage booking requests
- Real-time data sync with public website

### 📅 Booking System
- Booking request (not auto-confirmed)
- Firestore-based booking storage
- Booking status management:
  - PENDING
  - CONFIRMED
  - REJECTED
  - CANCELLED
- Email notifications for guests and admin

### 🖼️ Image Management
- Upload images directly from device
- Firebase Storage for secure hosting
- Optimized image delivery via CDN
- Used for rooms, gallery, and amenities

---

## 🛠️ Tech Stack

### Frontend
- **Angular (Standalone Components)**
- TypeScript
- Tailwind CSS
- Responsive & mobile-first design

### Backend (Serverless)
- **Firebase Authentication** – Admin login
- **Firestore** – CMS data & bookings
- **Firebase Storage** – Image uploads
- **Firebase Cloud Functions** – Email notifications

### Hosting
- Firebase Hosting / Netlify (recommended)

---

## 🧠 Architecture Overview

- Public website and admin panel share the same Angular app
- Admin routes are protected using route guards
- Data is stored once and reflected instantly across the site
- No traditional backend server (Spring Boot / Node not required)
- Designed for low cost, low maintenance, and high reliability

---

## 🔐 Security

- Admin-only write access
- Public read-only access for website data
- Firebase Security Rules enforced
- No sensitive data stored on the client

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Angular CLI
- Firebase account

### Install dependencies
- npm install -g @angular/cli
- npm install -g typescript
- npm install

### Run Project 
1> ng serve



