import React from "react";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const EditObjectModal = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Modifier un objet</DialogTitle>
      <DialogContent>
        <TextField style={{ marginTop: "10px" }} label="Titre" fullWidth />
        <TextField
          style={{ marginTop: "10px" }}
          label="Description"
          fullWidth
          multiline
        />

        <TextField style={{ marginTop: "10px" }} type="file" fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button variant="contained">Ajouter</Button>
      </DialogActions>
    </Dialog>
  );
};
export default EditObjectModal;
