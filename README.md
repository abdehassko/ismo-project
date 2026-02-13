🎓 Institute Management System (MERN Stack)

A full-stack web application for managing institute registrations, user validation, and role-based access control.

Built with the MERN Stack:

MongoDB

Express.js

React.js

Node.js

🚀 Features
👤 User Registration

Register as:

Admin

Formateur

Étudiant

Profile image upload

Password hashing (bcrypt)

Email duplication validation

Default account status: pending

🔐 Authentication

Login with JWT

Role-based access control

Only accepted users can login

🛠 Admin Dashboard

View pending registrations

Accept user

Reject user

Protected admin-only routes

🧱 Project Structure
client/
  ├── components/
  ├── pages/
  ├── api/
server/
  ├── models/
  ├── routes/
  ├── middlewares/
  ├── uploads/

🛢 Database

MongoDB with Mongoose schemas.

User Model Fields

nom

email (unique)

password (hashed)

filiere (ObjectId)

groupe (ObjectId)

role

image

status (pending / accepted / rejected)

⚙️ Installation
1️⃣ Clone repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO

2️⃣ Backend Setup
cd server
npm install


Create .env file:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key


Start backend:

npm run dev

3️⃣ Frontend Setup
cd client
npm install
npm start

🔑 Environment Variables
Variable	Description
MONGO_URI	MongoDB connection string
JWT_SECRET	Secret for signing tokens
PORT	Backend port
🧪 Technologies Used

React

Material UI

Axios

Node.js

Express

MongoDB

Mongoose

JWT

bcrypt

Multer

📌 Future Improvements

Email verification

Password reset

Pagination

Search & filtering

Deployment

👨‍💻 Author

Your Name
Full Stack MERN Developer
