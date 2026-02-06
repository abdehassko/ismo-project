import React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import NativeSelect from "@mui/material/NativeSelect";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormHelperText from "@mui/material/FormHelperText";

import { Link } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  //Control inputs
  const [form, setForm] = useState({
    nom: "",
    email: "",
    filiere: "",
    groupe: "",
    password: "",
    confirmpassword: "",
    role: "",
  });
  const [error, setError] = useState({
    errnom: "",
    erremail: "",
    errfiliere: "",
    errgroupe: "",
    errpassword: "",
    errconfirmpassword: "",
    errrole: "",
  });

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "file" ? files : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nom.trim()) {
      setError({ ...error, errnom: "Nom et prénom sont obligatoires" });
      return;
    }
    if (!form.email.trim()) {
      setError({ ...error, erremail: "L'email est obligatoire" });
      return;
    }
    if (!form.filiere.trim()) {
      setError({ ...error, errfiliere: "Le flière est obligatoire" });
      return;
    }
    if (!form.groupe.trim()) {
      setError({ ...error, errgroupe: "Le groupe est obligatoire" });
      return;
    }
    if (!form.password.trim()) {
      setError({ ...error, errpassword: "Le mot de passe est obligatoire" });
      return;
    }
    if (!form.confirmpassword.trim()) {
      setError({
        ...error,
        errconfirmpassword: "Mauvaise confirmation de mot de passe",
      });
      return;
    }
    if (!form.role.trim()) {
      setError({ ...error, errrole: "Le rôle est obligatoire" });
      return;
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
            sx={{
              color: "white",
              fontSize: 45,
              fontFamily: "CostumBold",
            }}
          >
            Inscription
          </Typography>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              id="filled-basic"
              name="nom"
              value={form.nom}
              onChange={handleChange}
              label="Nom et Prénom"
              variant="filled"
              style={{ background: "white", marginBottom: "11px" }}
              error={!!error.errnom}
              helperText={error.errnom}
            />
            <TextField
              id="filled-basic"
              label="Email"
              variant="filled"
              name="email"
              value={form.email}
              onChange={handleChange}
              error={!!error.erremail}
              helperText={error.erremail}
              style={{ background: "white", marginBottom: "11px" }}
            />
            <FormControl
              style={{ background: "white", marginBottom: "11px" }}
              fullWidth
            >
              <InputLabel
                style={{ marginLeft: "10px", marginTop: "5px" }}
                variant="standard"
                htmlFor="uncontrolled-native"
              >
                Filière
              </InputLabel>
              <NativeSelect
                style={{ marginLeft: "10px" }}
                defaultValue={30}
                inputProps={{
                  name: "Filière",
                  id: "uncontrolled-native",
                }}
              >
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </NativeSelect>
            </FormControl>
            <FormControl style={{ background: "white" }} fullWidth>
              <InputLabel
                style={{ marginLeft: "10px", marginTop: "5px" }}
                variant="standard"
                htmlFor="uncontrolled-native"
              >
                Groupe
              </InputLabel>
              <NativeSelect
                style={{ marginLeft: "10px" }}
                defaultValue={30}
                inputProps={{
                  name: "Filière",
                  id: "uncontrolled-native",
                }}
              >
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </NativeSelect>
            </FormControl>
            <FormControl
              sx={{ marginTop: 2, background: "white " }}
              variant="filled"
            >
              <InputLabel htmlFor="filled-adornment-password">
                Mot de passe
              </InputLabel>
              <FilledInput
                name="password"
                value={form.password}
                onChange={handleChange}
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
              {error.errpassword && (
                <FormHelperText>{error.errpassword}</FormHelperText>
              )}
            </FormControl>
            <FormControl
              sx={{ marginTop: 2, background: "white " }}
              variant="filled"
            >
              <InputLabel htmlFor="filled-adornment-password">
                Confirme mot de passe
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
            <FormGroup
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                color: "white",
                border: "solide 2px white",
                marginTop: "5px",
              }}
            >
              <FormControlLabel
                style={{ color: "white", border: "solide 2px white" }}
                control={
                  <Checkbox
                    sx={{
                      color: "white",
                      "&.Mui-checked": {
                        color: "black",
                      },
                    }}
                  />
                }
                label="Formateur"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: "white",
                      "&.Mui-checked": {
                        color: "black",
                      },
                    }}
                  />
                }
                label="Etudiant"
              />
            </FormGroup>
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
            <Button onClick={handleSubmit} variant="contained" color="success">
              Inscrivez-vous
            </Button>
          </CardActions>
        </div>
      </Card>
    </Container>
  );
}
