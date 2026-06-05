# ISMOCONNECT - Application de gestion d'annonces

**ISMOCONNECT** is a **REACT/EXPRESS JS-based academic announcement sharing platform** that allows users to upload, browse, comment, and download educational/lost objects announcements with role-based access. Now fully containerized with Docker and Nginx for easy deployment.

## 🚀 Features

* 👤 User registration (Profile image upload / Password hashing (bcrypt) / Register as Formateur or Étudiant)
* 🔐 User authentication (Login with JWT / Role-based access control / Only accepted users can login)
* 🛠 Admin Dashboard (View pending registrations, Accept user, Reject user, Protected admin-only routes)
* 🗣️ Lost Object Forum (Publish Request/Help-Comment on Request/Help)
* 📢 Announcement system (Targeted by filière and groupe)
* 🔔 Real-time notification system (new comments, approvals, announcements)
* 📧 Email notifications (Nodemailer)
* 📱 Responsive design for mobile and tablet devices
* 🐳 Docker containerization for easy deployment
* ⚡ Nginx reverse proxy for optimized static file serving

## 📁 Project Structure

ismo-project/
├── front-end/ # React application
│ ├── components/
│ ├── pages/
│ ├── modals/
│ ├── api/
│ └── Dockerfile
├── back-end/ # Express API
│ ├── models/
│ ├── routes/
│ ├── middlewares/
│ ├── services/
│ ├── uploads/
│ └── Dockerfile
├── docker-compose.yml # Docker services orchestration
├── nginx.conf # Nginx reverse proxy configuration
└── README.md

## ⚙️ Requirements

* Docker Desktop installed and running
* Git
* Modern web browser
* 4GB RAM minimum (8GB recommended)

## 🛠️ Installation & Deployment with Docker

### 1. Clone the repository

```bash
git clone https://github.com/abdehassko/ismo-project
cd ismo-project

### 2. Configure environment variables

Create a `.env` file inside the `back-end/` directory:

```env
MONGO_URI=mongodb://root:123456@mongo:27017/ismo-project-db?authSource=admin
PORT=5000
JWT_SECRET=ismopass
EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your_app_password```

Note for Gmail: You need to use an App Password for EMAIL_PASS, not your regular Gmail password.

### 3. Build and run with Docker Compose
    docker-compose up --build

### 4. Initialize the database (first time only)
Open your browser and navigate to:
    http://localhost/api/init

### 5. Access the application
Open your browser and go to:
http://localhost

🛑 Stop the application
    docker-compose down

To remove volumes and clean up data:
    docker-compose down -v

🔧 Docker Services
Service	    Port	            Description
Nginx	    80	                Reverse proxy serving static files and API requests
Frontend    3000 (internal)	    React development server
Backend	    5000 (internal)	    Express API
MongoDB	    27017 (internal)	Database

👤 Default Admin Account
    Email: admin@ismo.com
    Password: admin123

🧪 Technologies Used
    Frontend
        React.js
        Material UI (MUI)
        Axios

    Backend
        Node.js
        Express.js
        MongoDB with Mongoose
        JWT for authentication
        bcrypt for password hashing
        Multer for file uploads
        Nodemailer for emails

    DevOps & Containerization
        Docker
        Docker Compose
        Nginx (reverse proxy)


        
🐛 Troubleshooting

    Port 80 already in use
    Change the host port in docker-compose.yml:
        ports:
        - "8080:80"

    MongoDB connection issues
        docker-compose ps
        docker-compose logs mongo

    Rebuild without cache
        docker-compose build --no-cache
        docker-compose up

    View logs
        docker-compose logs -f

🚀 Future Improvements
    🌐 Multi-language support (Spanish / English / Arabic)
    📊 Analytics dashboard for admins
    🔍 Advanced search and filtering
    📱 Mobile app with React Native
    🚢 CI/CD pipeline with GitHub Actions
    ☁️ Cloud deployment (AWS/GCP/Azure)

📝 Development (without Docker)
    Backend Setup
        cd back-end
        npm install
        npm run dev

    Frontend Setup
        cd front-end
        npm install
        npm start

👥 Authors
    Abderrahim Elhasskouri
    Digital Development Student – OFPPT

    Idriss Mjahad
    Digital Development Student – OFPPT

📄 License
    This project is for educational purposes as part of OFPPT curriculum.

⭐ Show your support
    If you like this project, feel free to star the repository and share it!


### 🖼️ Screenshots
        <img width="1365" height="637" alt="image" src="https://github.com/user-attachments/assets/0bbbae4c-e82c-43b8-a433-442099f14328" />
        <img width="1366" height="635" alt="image" src="https://github.com/user-attachments/assets/b80912fd-e78b-4839-9a11-5b6f6933ed53" />
        <img width="1352" height="601" alt="image" src="https://github.com/user-attachments/assets/e50f8710-7901-4c74-a459-e30740600bb4" />
        <img width="1365" height="633" alt="image" src="https://github.com/user-attachments/assets/87a56e29-b35f-4497-be45-7f738751905a" />
        <img width="1365" height="639" alt="image" src="https://github.com/user-attachments/assets/e54da60c-10e8-442e-bd15-c043fcce5762" />
        <img width="1366" height="643" alt="image" src="https://github.com/user-attachments/assets/7f53bf6c-3968-4909-b653-b9ae45ff2aff" />
        <img width="1366" height="642" alt="image" src="https://github.com/user-attachments/assets/9c501224-5e44-4c91-8844-248de31c4e23" />

