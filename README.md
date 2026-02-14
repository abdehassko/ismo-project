"# ISMOPROJECT-Application-de-gestion-de-annonces" 
# ISMOPROJECT

ISMOPROJECT is a **REACT/EXPRESS JS-based academic Announecement sharing platform** that allows users to upload, browse,comment, and download educational/losted objects annonces with role-based access.

---

## 🚀 Features

* 👤 User registration (Profile image upload / Password hashing (bcrypt) / Register as Formateur or Étudiant)
* 🔐 User authentication (Login with JWT / Role-based access control / Only accepted users can login)
* 🛠 Admin Dashboard (View pending registrations, Accept user, Reject user, Protected admin-only routes)
* 🗣️ Lost Object Forum (Publish Request/Help-Comment on Request/Help)
* 📢 Announcement
* 🔔 Real-time notification system (new comments, approvals, announcements)
---

## 📁 Project Structure

```
fron-end/
  ├── components/
  ├── pages/
  ├── api/
back-end/
  ├── models/
  ├── routes/
  ├── middlewares/
  ├── uploads/

```
---

## ⚙️ Requirements

* PHP >= 8.0
* MySQL / MariaDB
* XAMPP / WAMP / LAMP
* Web browser

---


## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/abdehassko/ismo-project
cd ismo-project
```

2. Backend Setup

```bash
cd back-end
npm install
```
* Create .env file:
```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```
* Start backend:
```bash
npm run dev
```

3. Frontend Setup:

```bash
cd client
npm install
npm start
```
---

## 🧪 Technologies Used
* React
* Material UI
* Axios
* Node.js
* Express
* MongoDB
* Mongoose
* JWT
* bcrypt
* Multer



### 🖼️ Screenshots








---

### 🚀 Future Improvements

* 📱 Version mobile / application responsive pour une meilleure expérience sur smartphones et tablettes 
* 🛡️  Email verification / Password reset
* 🌐 Support multilingue (Espagnole / Anglais / Arabe) 


## 🧑‍💻 Authors

**Abderrahim Elhasskouri**
Digital Development Student – OFPPT
**Idriss Mjahad**
Digital Development Student – OFPPT


---

⭐ If you like this project, feel free to star the repository!


