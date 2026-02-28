import * as React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import { getUser } from "../auth";
import api from "../api/axios";

export default function Profile() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
    filiere: "",
    groupe: "",
    password: "",
  });

  useEffect(() => {
    const user = getUser();
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        role: user.role || "",
        filiere: user.filiere || "",
        groupe: user.groupe || "",
        password: "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const user = getUser();
      const updateData = { ...formData };
      if (!updateData.password) delete updateData.password;

      const res = await api.put(`/users/${user.id}`, updateData);

      // update localStorage with new data
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          fullName: res.data.fullName,
          email: res.data.email,
          role: res.data.role,
          filiere: res.data.filiere,
          groupe: res.data.groupe,
        }),
      );

      alert("Profile updated successfully");
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseUpPassword = (event) => event.preventDefault();

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Navbar />
      <Box sx={{ maxWidth: 600, mx: "auto", p: 4 }}>
        <h1
          style={{ fontFamily: "costumBold", marginBottom: 32, color: "#333" }}
        >
          Votre Profil
        </h1>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Read-only section */}
          <Box
            sx={{
              backgroundColor: "#fff",
              p: 3,
              borderRadius: 2,
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <TextField
              fullWidth
              disabled
              name="fullName"
              label="Nom Complet"
              value={formData.fullName}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              name="email"
              label="Email"
              value={formData.email}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              disabled
              name="filiere"
              label="Filière"
              value={formData.filiere?.nom || ""}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              disabled
              name="groupe"
              label="Groupe"
              value={formData.groupe?.nom || ""}
              variant="outlined"
            />
          </Box>

          {/* Editable section */}
          <Box
            sx={{
              backgroundColor: "#fff",
              p: 3,
              borderRadius: 2,
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <TextField
              fullWidth
              disabled
              name="role"
              label="Rôle"
              value={formData.role}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth variant="outlined">
              <InputLabel>Mot de passe</InputLabel>
              <FilledInput
                name="password"
                label="Mot de passe"
                value={formData.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>

          {/* Submit button */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#36cf83",
              "&:hover": { backgroundColor: "#2bb86f" },
              py: 1.5,
              fontWeight: 600,
              borderRadius: 1,
            }}
          >
            Modifier le profil
          </Button>
        </Box>
      </Box>
    </div>
  );
}
