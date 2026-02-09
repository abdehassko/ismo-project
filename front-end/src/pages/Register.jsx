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
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Radio from "@mui/material/Radio";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/axios";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function Register() {
  //Material ui
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  //import filiere and groupes

  const [filieres, setFilieres] = useState([]);
  const [groupes, setGroupes] = useState([]);

  useEffect(() => {
    api
      .get("/filieres")
      .then((res) => setFilieres(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleFiliereChange = (e) => {
    const filiereId = e.target.value;

    setForm((prev) => ({
      ...prev,
      filiere: filiereId,
      groupe: "", // reset groupe when filiere changes
    }));
    setError({ ...error, [`errfiliere`]: "" });

    api
      .get(`/groupes/${filiereId}`)
      .then((res) => setGroupes(res.data))
      .catch((err) => console.log(err));
  };

  //check duplicated email
  async function checkEmail(email) {
    try {
      const res = await api.post("/check-email", { email });
      return { valid: true, message: res.data.message };
    } catch (err) {
      if (err.response?.status === 409) {
        return { valid: false, message: "Email already exists" };
      }

      return { valid: false, message: "Server error" };
    }
  }

  //Control inputs
  const [form, setForm] = useState({
    nom: "",
    email: "",
    filiere: "",
    groupe: "",
    password: "",
    confirmpassword: "",
    role: "",
    image: null,
  });
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
    setError({ ...error, [`err${name}`]: "" });
  };

  const validate = async () => {
    let newError = {};

    if (!form.nom.trim()) {
      newError.errnom = "Nom et prénom sont obligatoires";
    } else {
      const nomRegex = /^(?=.*[A-Za-z]).{6,}$/;
      if (!nomRegex.test(form.nom)) {
        newError.errnom = "Nom est trop court";
      }
    }

    if (!form.email.trim()) {
      newError.erremail = "L'email est obligatoire";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        newError.erremail = "L'email est invalide";
      } else {
        const result = await checkEmail(form.email);
        if (!result.valid) {
          newError.erremail = result.message;
        }
      }
    }

    if (!form.filiere.trim())
      newError.errfiliere = "La filière est obligatoire";

    if (!form.groupe.trim()) newError.errgroupe = "Le groupe est obligatoire";

    if (!form.password.trim()) {
      newError.errpassword = "Le mot de passe est obligatoire";
    } else {
      const passwordRegex = /^(?=.*[A-Za-z]).{8,}$/;
      if (!passwordRegex.test(form.password)) {
        newError.errpassword =
          "Mot de passe doit contenir au moins 8 caractères";
      }
    }

    if (form.password !== form.confirmpassword || !form.confirmpassword.trim())
      newError.errconfirmpassword = "Confirmation de mot de passe est erronée";

    if (!form.role.trim()) newError.errrole = "Le rôle est obligatoire";
    if (!form.image) newError.errimage = "L'image est obligatoire";

    setError(newError);

    return Object.keys(newError).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = await validate();
    if (!isValid) return;

    const data = new FormData();
    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });

    await api.post("/registration/register", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("FORM OK", form);
    alert("Inscription envoyée, en attente de validation");
  };

  return (
    <Container
      maxWidth="md"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ minWidth: 500 }} style={{ background: "#283593" }}>
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
              id="filled-basic-nom"
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
              id="filled-basic-email"
              label="Email"
              variant="filled"
              name="email"
              value={form.email}
              onChange={handleChange}
              error={!!error.erremail}
              helperText={error.erremail}
              style={{ background: "white", marginBottom: "11px" }}
            />
            {error.errfiliere && (
              <FormHelperText
                style={{ display: "flex" }}
                sx={{ color: "#ff6b6b" }}
              >
                {error.errfiliere}
              </FormHelperText>
            )}
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
                value={form.filiere}
                onChange={handleFiliereChange}
                style={{ marginLeft: "10px" }}
                inputProps={{
                  name: "filiere",
                  id: "uncontrolled-native-filière",
                }}
              >
                <option disabled></option>

                {filieres.map((filiere) => (
                  <option key={filiere._id} value={filiere._id}>
                    {filiere.nom}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
            {error.errgroupe && (
              <FormHelperText
                style={{ display: "flex" }}
                sx={{ color: "#ff6b6b" }}
              >
                {error.errgroupe}
              </FormHelperText>
            )}

            <FormControl style={{ background: "white" }} fullWidth>
              <InputLabel
                style={{ marginLeft: "10px", marginTop: "5px" }}
                variant="standard"
                htmlFor="uncontrolled-native"
              >
                Groupe
              </InputLabel>
              <NativeSelect
                value={form.groupe}
                onChange={handleChange}
                style={{ marginLeft: "10px" }}
                inputProps={{
                  name: "groupe",
                  id: "uncontrolled-native-groupe",
                }}
              >
                <option disabled></option>
                {groupes.map((groupe) => (
                  <option key={groupe._id} value={groupe._id}>
                    {groupe.nom}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
            <FormControl
              error={!!error.errpassword}
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
            <FormControl
              error={!!error.errconfirmpassword}
              sx={{ marginTop: 2, background: "white " }}
              variant="filled"
            >
              <InputLabel htmlFor="filled-adornment-password">
                Confirme mot de passe
              </InputLabel>
              <FilledInput
                id="filled-adornment-password-2"
                name="confirmpassword"
                value={form.confirmpassword}
                onChange={handleChange}
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
              {error.errconfirmpassword && (
                <FormHelperText style={{ color: "#E32727" }}>
                  {error.errconfirmpassword}
                </FormHelperText>
              )}
            </FormControl>

            {error.errrole && (
              <FormHelperText
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
                sx={{ color: "#ff6b6b" }}
              >
                {error.errrole}
              </FormHelperText>
            )}
            <FormControl
              error={!!error.errrole}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                color: "white",
                border: "solide 2px white",
              }}
            >
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="role"
                value={form.role}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="formateur"
                  control={<Radio />}
                  label="Formateur"
                />
                <FormControlLabel
                  value="etudiant"
                  control={<Radio />}
                  label="Étudiant"
                />
              </RadioGroup>
            </FormControl>
            {form.image && (
              <Typography sx={{ color: "#78f85e" }} variant="caption">
                {form.image.name}
              </Typography>
            )}
            {error.errimage && (
              <FormHelperText
                style={{ display: "flex", justifyContent: "center" }}
                sx={{ color: "#ff6b6b" }}
              >
                {error.errimage}
              </FormHelperText>
            )}

            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Choisissez votre image
              <VisuallyHiddenInput
                name="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
              />
            </Button>
          </div>
        </CardContent>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
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
