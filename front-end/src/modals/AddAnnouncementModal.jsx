import React from "react";
import { useState } from "react";
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
const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const AddAnnouncementModal = ({ open, handleClose, fetchAnnouncements }) => {
  const [formData, setFormData] = useState({
  title: "",
  description: "",
  attachment: String,
  filiere: [],
  groupe: [],
});

  const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: typeof value === "string" ? value.split(",") : value,
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("SUBMITTED");

  try {
    const res = await fetch("http://localhost:5000/api/announcements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Announcement added successfully");

    // optional reset
    setFormData({ title: "", description: "" });

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
      <DialogContent> <form onSubmit={handleSubmit}></form>
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
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Filière</em>;
              }

              return selected.join(", ");
            }}
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="">
              <em>Filière</em>
            </MenuItem>
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
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

              return selected.join(", ");
            }}
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="">
              <em>Groupe</em>
            </MenuItem>
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField style={{ marginTop: "10px" }} type="file" fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button type="submit" variant="contained" sx={{ mt: 3 }}>
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default AddAnnouncementModal;
