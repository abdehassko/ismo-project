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
              label="Email"
              variant="filled"
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
                type={showPassword ? "text" : "password"}
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
            <Button variant="contained" color="success">
              Connexion
            </Button>
          </CardActions>
        </div>
      </Card>
    </Container>
  );
}
