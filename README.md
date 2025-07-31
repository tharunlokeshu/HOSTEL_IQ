# 🏨 Hostel IQ – Advanced Hostel Helpdesk Portal

A **next-gen full-stack hostel helpdesk system** built with Django, React, and MySQL — offering advanced complaint tracking, room change workflows, emergency reporting, and more — tailored for **students and admins** with secure, role-based dashboards.

![Hostel IQ Banner](https://user-images.githubusercontent.com/yourusername/banner_hostel_iq.png)

---

## 🔗 Live Demo

> 🌐 Frontend: [http://localhost:3000](http://localhost:3000)
> 🛠️ Backend API: [http://localhost:8000/api/](http://localhost:8000/api/)

---

## 📸 Screenshots (Updated)

### 🎓 Student Dashboard

![Student Dashboard](https://user-images.githubusercontent.com/yourusername/screenshots/new_student_dashboard.png)

### 🛠️ Admin Dashboard

![Admin Dashboard](https://user-images.githubusercontent.com/yourusername/screenshots/new_admin_dashboard.png)

### 📝 Submit Complaint

![Submit Complaint](https://user-images.githubusercontent.com/yourusername/screenshots/new_submit_complaint.png)

### 🚪 Room Change Request

![Room Change](https://user-images.githubusercontent.com/yourusername/screenshots/new_room_change.png)

### 🩺 Medical Emergency Report

![Medical Emergency](https://user-images.githubusercontent.com/yourusername/screenshots/new_medical_emergency.png)

### 📤 Out Pass Request

![Out Pass](https://user-images.githubusercontent.com/yourusername/screenshots/new_outpass.png)

### 📦 Lost & Found

![Lost & Found](https://user-images.githubusercontent.com/yourusername/screenshots/new_lost_found.png)

### 📊 Export Reports

![Export Reports](https://user-images.githubusercontent.com/yourusername/screenshots/new_export_reports.png)

---

## ✨ Features

### 👨‍🎓 Student Portal

* 🔐 JWT-based login with auto token refresh
* 📝 Complaint submission (title, description, image, room number)
* 🚪 Room change request (current & desired room, reason)
* 📤 Out-pass request (reason, destination, date range)
* 🩺 Emergency report (urgency, issue, location)
* 🍛 Anonymous mess feedback
* 📦 Lost & Found reporting & tracking
* 🧾 View history of personal requests

### 🧑‍💼 Admin Panel

* 🧾 View/manage complaints with status tracking
* 🚪 Approve/reject room change & outpass
* 🩺 Manage medical emergency statuses
* 📦 Update Lost & Found claims
* 📢 Post student-wide notices
* 📊 Export CSV reports (complaints, outpasses, medical)
* 📈 View feedback, audit logs, student counts

---

## 🧰 Tech Stack

### 🔠 Frontend

* **React.js** with **functional components**
* **Tailwind CSS** for a sleek and responsive design
* **React Router DOM** for page navigation
* **Axios** for API requests
* **Lucide Icons & React Icons** for beautiful dashboards

### 🔙 Backend

* **Django + Django REST Framework** for REST APIs
* **MySQL** for database
* **Pandas** for CSV export features
* **CustomUser model** with `is_admin` and `is_student` roles

### 🔐 Authentication

* **JWT** access/refresh tokens
* Token refresh logic in frontend utils
* Role-based protected routes and API permissions

---

## 📁 Project Structure

```
hostel-iq/
├── hostel_backend/           # Django Project Root
│   ├── helpdesk/             # All helpdesk models, views, serializers, URLs
│   └── users/                # CustomUser, auth APIs (login/register)
├── frontend/
│   ├── public/               # Public assets (logo, index.html)
│   └── src/
│       ├── components/       # Reusable components (Navbar, Cards, etc.)
│       ├── pages/
│       │   ├── admin/        # Admin dashboard & feature pages
│       │   └── student/      # Student dashboard & feature pages
│       └── utils/            # JWT utilities, Axios instance, auth helpers
```

---

## 🚀 Getting Started

### ⚙️ Backend Setup

```bash
cd hostel_backend
python -m venv env
source env/bin/activate  # Windows: env\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

### 💻 Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🔐 Sample Admin Credentials

```txt
username: admin
password: admin123
```

> ⚠️ Change default credentials before production deployment

---

## 🛡️ Security Measures

* JWT Access + Refresh token logic with auto-expiry check
* Role-based endpoint protection using DRF permissions
* Route-level guards for Student and Admin pages
* Input sanitization and backend validations

---

## 🔮 Planned Enhancements

* 🔔 Push Notifications for complaint updates
* 📱 Mobile App (React Native)
* 🤖 AI-powered Chatbot for instant help
* 📊 Dynamic charts & filters in Admin Dashboard
* 🪪 QR code for student entry/exit logs
* 🔁 API versioning for stability

---

## 📃 License

Licensed under the **MIT License**.

---

## 👨‍💻 Author

**Tharun Lokesh Uggina**
🔗 [LinkedIn](https://www.linkedin.com/in/tharun-lokesh-uggina)
📧 [tharunlokeshu@gmail.com](mailto:tharunlokeshu@gmail.com)

---

## 🌟 Show Your Support

If this project helped you, star ⭐ it, fork 🍴 it, or share it 💬 with your friends!

---

