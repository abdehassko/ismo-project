import React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Welcome " + data.user.fullName);

      console.log(data.user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ minWidth: 275 }} style={{ background: "#283593" }}>
        <CardContent>
          <Typography
            gutterBottom
            sx={{
              color: "white",
              fontSize: 45,
              fontFamily: "CostumBold",
            }}
          >
            Connexion
          </Typography>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              id="filled-basic"
              name="email"
              label="Email"
              variant="filled"
              value={formData.email}
              onChange={handleChange}
              style={{ background: "white", marginBottom: "11px" }}
            />
            <FormControl
              sx={{ marginTop: 2, background: "white " }}
              variant="filled"
            >
              <InputLabel htmlFor="filled-adornment-password">
                Mot de passe
              </InputLabel>
              <FilledInput
                id="filled-adornment-password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
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
          </div>
        </CardContent>
        <div style={{ display: "flex" }}>
          <CardActions>
            <Link to="/register">
              <Button
                variant="contained"
                style={{ background: "#ffffff", color: "black" }}
              >
                Inscrivez-vous
              </Button>
            </Link>
          </CardActions>
          <CardActions>
            <Button variant="contained" color="success" onClick={handleLogin}>
              Connexion
            </Button>
          </CardActions>
        </div>
      </Card>
    </Container>
  );
}
