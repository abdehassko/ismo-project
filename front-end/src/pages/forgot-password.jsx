import React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import FormHelperText from "@mui/material/FormHelperText";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";

export default function Forgotpassword() {
  //Material ui
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const [error, setError] = useState({});

  const [showSuccess, setShowSuccess] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowSuccess(false);
  };

  const [showSuccess2, setShowSuccess2] = useState(false);
  const handleClose2 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowSuccess(false);
  };
  const [form, setform] = useState({
    email: "",
    code: "",
    password: "",
  });

  async function checkEmailForReset(email) {
    try {
      const res = await api.post("/check-email-for-reset", { email });
      return { valid: true, message: res.data.message };
    } catch (err) {
      if (err.response?.status === 409) {
        return { valid: false, message: "Ce email n'existe pas" };
      }

      return { valid: false, message: "Server error" };
    }
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const [openCode, setOpenCode] = useState(false);

  const validate = async () => {
    let newError = {};

    if (!form.email.trim()) {
      newError.erremail = "L'email est obligatoire";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        newError.erremail = "L'email est invalide";
      }
    }
    if (openCode) {
      if (!form.code.trim()) {
        newError.errcode = "Le code est obligatoire";
      }
      if (!form.password.trim()) {
        newError.errpassword = "Le mot de passe est obligatoire";
      } else {
        const passwordRegex = /^(?=.*[A-Za-z]).{8,}$/;
        if (!passwordRegex.test(form.password)) {
          newError.errpassword =
            "Mot de passe doit contenir au moins 8 caractères";
        }
      }
    }

    setError(newError);

    return Object.keys(newError).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = await validate();
    if (!isValid) return;

    try {
      if (!openCode) {
        const result = await checkEmailForReset(form.email);

        console.log(true);

        if (!result.valid) {
          setError({ erremail: result.message });
          return;
        }

        await api.post("/login/send-reset-code", {
          email: form.email,
        });

        setOpenCode(true);

        setShowSuccess(true);

        return;
      }

      await api.post("/login/reset-password", {
        email: form.email,
        code: form.code,
        password: form.password,
      });

      setShowSuccess2(true);
      setform({
        email: "",
        code: "",
        password: "",
      });

      setOpenCode(false);
    } catch (error) {
      console.error(error);

      if (error.response?.data?.message) {
        setError({ errcode: error.response.data.message });
      }
    }
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
            sx={{ color: "white", fontSize: 45, fontFamily: "CostumBold" }}
          >
            Réinitialisation
          </Typography>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              id="filled-basic"
              name="email"
              disabled={openCode}
              label="Tapez Votre Email"
              variant="filled"
              value={form.email}
              onChange={handleChange}
              style={{ background: "white", marginBottom: "11px" }}
              error={!!error.erremail}
              helperText={error.erremail}
            />
            {openCode && (
              <TextField
                id="filled-basic"
                name="code"
                label="Code"
                variant="filled"
                value={form.code}
                onChange={handleChange}
                style={{ background: "white", marginBottom: "11px" }}
                error={!!error.errcode}
                helperText={error.errcode}
              />
            )}
            {openCode && (
              <FormControl
                error={!!error.errpassword}
                sx={{ marginTop: 2, background: "white " }}
                variant="filled"
              >
                <InputLabel htmlFor="filled-adornment-password">
                  Nouveau mot de passe
                </InputLabel>
                <FilledInput
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  id="filled-adornment-password-1"
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
                {error.errpassword && (
                  <FormHelperText style={{ color: "#E32727" }}>
                    {error.errpassword}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          </div>
        </CardContent>
        <div style={{ display: "flex" }}>
          <CardActions>
            <Link to="/login">
              <Button
                variant="contained"
                style={{ background: "#ffffff", color: "black" }}
              >
                Connexion
              </Button>
            </Link>
          </CardActions>
          <CardActions>
            <Button variant="contained" color="success" onClick={handleSubmit}>
              {openCode ? "Réinitialiser" : "Envoyer le code"}
            </Button>
          </CardActions>
        </div>
      </Card>
      {showSuccess && (
        <Snackbar
          open={showSuccess}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Le code de réinitialisation est envoyé à votre email avec succès
          </Alert>
        </Snackbar>
      )}
      {showSuccess2 && (
        <Snackbar
          open={showSuccess2}
          autoHideDuration={4000}
          onClose={handleClose2}
        >
          <Alert
            onClose={handleClose2}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Votre mot de passe a été modifié avec succès
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
}
