import React from "react";
import { useState,useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import api from "../api/axios"

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const AddAnnouncementModal = ({ open, handleClose, fetchAnnouncements }) => {
  const [formData, setFormData] = useState({
  title: "",
  description: "",
  attachment: "",
  filiere: [],
  groupe: [],
});

//import filiere and groupes

  const [filieres, setFilieres] = useState([]);
  const [groupes, setGroupes] = useState([]);


  useEffect(() => {
    api
      .get("/filieres")
      .then((res) => {
      console.log("filieres data:", res.data); // add this
      setFilieres(res.data);
    })
      .catch((err) => console.log(err));
  }, []);

  const handleFiliereChange = (e) => {
  const value = e.target.value;
  const selected = typeof value === "string" ? value.split(",") : value;

  setFormData((prev) => ({
    ...prev,
    filiere: selected,
    groupe: [],
  }));

  // fetch groupes for all selected filieres
  Promise.all(selected.map((id) => api.get(`/groupes/${id}`)))
    .then((responses) => {
      const allGroupes = responses.flatMap((res) => res.data);
      // remove duplicates by _id
      const unique = allGroupes.filter(
        (g, index, self) => index === self.findIndex((x) => x._id === g._id)
      );
      setGroupes(unique);
    })
    .catch((err) => console.log(err));
};

  const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: name === "filiere" || name === "groupe"
      ? typeof value === "string" ? value.split(",") : value
      : value,
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("SUBMITTED");

  try {
    // ✅ Replace with this
await api.post("/announcements", formData);
alert("Announcement added successfully");

    // optional reset
    setFormData({ title: "", description: "", attachment: "", filiere: [], groupe: [] });

    // close modal
    handleClose();

    // refresh list (IMPORTANT)
    fetchAnnouncements();

  } catch (error) {
    console.error(error);
    alert("Server error");
  }
};


  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Ajouter une annonce</DialogTitle>
      <DialogContent> <form id="announcement-form" onSubmit={handleSubmit}>
        <TextField
         style={{ marginTop: "10px" }}
          label="Title"
          name="title"
          fullWidth
          value={formData.title}
          onChange={handleChange}
          required/>
        <TextField
          style={{ marginTop: "10px" }}
          label="Description"
          name="description"
          multiline
          rows={4}
          fullWidth
          value={formData.description}
          onChange={handleChange}
          required
          sx={{ mt: 2 }}
        />
        <FormControl style={{ marginTop: "10px" }} fullWidth>
          <Select
            multiple
            displayEmpty
            name="filiere"
            value={formData.filiere}
            onChange={handleFiliereChange}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Filière</em>;
              }
              return filieres
                .filter((f) => selected.includes(f._id))
                .map((f) => f.nom)
                .join(", ");
            }}
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="">
              <em>Filière</em>
            </MenuItem>
            {filieres.map((filiere) => (
              <MenuItem key={filiere._id} value={filiere._id}>
                {filiere.nom}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl style={{ marginTop: "10px" }} fullWidth>
          <Select
            multiple
            displayEmpty
            name="groupe"
            value={formData.groupe}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Groupe</em>;
              }
              return groupes
                .filter((g) => selected.includes(g._id))
                .map((g) => g.nom)
                .join(", ");
            }}
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="">
              <em>Groupe</em>
            </MenuItem>
            {groupes.map((groupe) => (
              <MenuItem key={groupe._id} value={groupe._id}>
                {groupe.nom}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField style={{ marginTop: "10px" }} type="file" fullWidth />
      </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button type="submit" form="announcement-form" variant="contained" sx={{ mt: 3 }}>
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default AddAnnouncementModal;
