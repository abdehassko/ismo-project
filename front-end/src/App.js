import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Announcements from "./pages/Announcements";
import Objects from "./pages/Objects";
import Profile from "./pages/Profile";
import Notfound from "./pages/Notfound";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/announcements"
            element={
              <PrivateRoute allowedRoles={["etudiant", "formateur", "admin"]}>
                <Announcements />
              </PrivateRoute>
            }
          />
          <Route
            path="/objects"
            element={
              <PrivateRoute allowedRoles={["etudiant", "formateur", "admin"]}>
                <Objects />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute allowedRoles={["etudiant", "formateur", "admin"]}>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
