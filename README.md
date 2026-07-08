# ServiceNow – Local Service Finder Platform

ServiceNow is a full-stack web application that connects customers with local service providers such as plumbers, electricians, painters, cleaners, carpenters, and AC repair professionals.

It allows:
- **Customers** to browse services, view providers, book appointments, and manage bookings
- **Providers** to sign up, manage their profile, view appointments, and update booking status

This project was built as a practical **full-stack service marketplace platform** using **HTML, CSS, JavaScript, Spring Boot, MySQL, and cloud deployment**.

---

## Live Demo

### Frontend (Netlify)
[Open Frontend](https://dazzling-melomakarona-d2eeff.netlify.app)

### Backend API (Render)
[Open Backend](https://servicenow-backend-88y5.onrender.com)

---

# Features

## Customer Features
- Sign up / Login as customer
- Browse popular home services
- Search services
- Sort services A–Z / Z–A
- View available providers for each service
- Book a provider with:
  - Date
  - Time
  - Address
- View personal bookings
- Cancel booking if status is **Pending**

## Provider Features
- Sign up / Login as provider
- Add service details during signup:
  - service type
  - experience
  - pricing
  - location
  - about
  - image
- View provider dashboard
- View all appointments
- Accept / Reject pending bookings
- Mark accepted bookings as completed

## Admin / System Features
- Persistent data storage using MySQL
- Separate backend REST APIs
- Deployed frontend and backend
- Customer and provider role-based flow

---

# Tech Stack

## Frontend
- HTML5
- CSS3
- JavaScript (Vanilla JS)

## Backend
- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Maven

## Database
- MySQL

## Deployment
- Frontend: Netlify
- Backend: Render
- Database: Aiven MySQL / Railway MySQL (depending on deployment setup)

---

# Project Structure

```bash
servicenow-fullstack/
│
├── servicenow-frontend/
│   ├── index.html
│   ├── user.html
│   ├── provider.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── data.js
│       ├── script.js
│       ├── user.js
│       └── provider.js
│
├── servicenow-backend/
│   ├── src/main/java/com/servicenow/backend/
│   │   ├── controller/
│   │   ├── entity/
│   │   ├── repository/
│   │   └── BackendApplication.java
│   │
│   ├── src/main/resources/
│   │   └── application.properties
│   │
│   ├── pom.xml
│   └── Dockerfile
│
└── README.md
