import React from "react";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

import { useState, useEffect } from "react";
import api from "../api/axios";

const EditObjectModal = ({ open, object, handleClose, setShowSuccess }) => {
  const [form, setForm] = useState({
    titre: "",
    description: "",
    status: "",
    image: null,
  });

  useEffect(() => {
    if (object) {
      setForm({
        titre: object.title || "",
        description: object.description || "",
        status: object.status || "",
        image: null,
      });
    }
  }, [object, open]);
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

    if (!form.titre.trim()) {
      newError.errtitre = "Titre est obligatoire";
    } else {
      const titreRegex = /^(?=.*[A-Za-z]).{6,}$/;
      if (!titreRegex.test(form.titre)) {
        newError.errtitre = "Titre est trop court";
      }
    }

    if (!form.description.trim()) {
      newError.errdescription = "Description est obligatoire";
    } else {
      const descriptionRegex = /^(?=.*[A-Za-z]).{15,}$/;
      if (!descriptionRegex.test(form.description)) {
        newError.errdescription = "Description est trop court";
      }
    }

    if (!form.status.trim()) {
      newError.errstatus = "L'état est obligatoire";
    }

    if (form.image && !form.image.type.startsWith("image/")) {
      newError.errimage = "Seules les images sont approuvées";
    }

    setError(newError);

    return Object.keys(newError).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = await validate();
    if (!isValid) return;

    const data = new FormData();
    data.append("titre", form.titre);
    data.append("description", form.description);
    data.append("status", form.status);

    // ONLY append image if user selected one
    if (form.image) {
      data.append("image", form.image);
    }

    try {
      const res = await api.put(`/objects/${object._id}`, data);
      console.log(res.data);
    } catch (error) {
      console.log("Full error:", error.response);
    }
    setShowSuccess(true);
    handleClose();
    setTimeout(() => {
      window.location.reload();
    }, 3000);

    setForm({
      titre: "",
      description: "",
      status: "",
      image: null,
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Modifier un objet</DialogTitle>
      <DialogContent>
        <TextField
          error={!!error.errtitre}
          helperText={error.errtitre}
          name="titre"
          onChange={handleChange}
          value={form.titre}
          style={{ marginTop: "10px" }}
          label="Titre *"
          fullWidth
        />
        <TextField
          error={!!error.errdescription}
          helperText={error.errdescription}
          style={{ marginTop: "10px" }}
          label="Description *"
          fullWidth
          name="description"
          multiline
          onChange={handleChange}
          value={form.description}
        />
        <FormControl style={{ marginTop: "10px" }} fullWidth required>
          <InputLabel
            sx={{ color: error.errstatus ? "#e43030" : undefined }}
            id="demo-simple-select-required-label"
          >
            État
          </InputLabel>
          <Select
            name="status"
            value={form.status}
            onChange={handleChange}
            label="État *"
            error={!!error.errstatus}
          >
            <MenuItem value="lost">Perdu</MenuItem>
            <MenuItem value="found">Trouvé</MenuItem>
          </Select>
          <FormHelperText>
            {error.errstatus && (
              <FormHelperText
                style={{ display: "flex" }}
                sx={{ color: "#e43030" }}
              >
                {error.errstatus}
              </FormHelperText>
            )}
          </FormHelperText>
        </FormControl>
        <TextField
          error={!!error.errimage}
          helperText={error.errimage}
          name="image"
          type="file"
          accept="image/*"
          onChange={handleChange}
          style={{ marginTop: "10px" }}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Modifier
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default EditObjectModal;
