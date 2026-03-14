import React, { useState, useEffect } from "react";
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
import api from "../api/axios";

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

const ModifyAnnouncementModal = ({
  open,
  handleClose,
  announcement,
  fetchAnnouncements,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    filiere: [],
    groupe: [],
  });
  const [attachment, setAttachment] = useState(null);
  const [filieres, setFilieres] = useState([]);
  const [groupes, setGroupes] = useState([]);

  useEffect(() => {
    if (!announcement) return;
    setFormData({
      title: announcement.title || "",
      description: announcement.description || "",
      filiere: announcement.filiere || [],
      groupe: announcement.groupe || [],
    });
  }, [announcement?._id]);
  useEffect(() => {
    if (!announcement?.filiere?.length) return;

    Promise.all(announcement.filiere.map((id) => api.get(`/groupes/${id}`)))
      .then((responses) => {
        const allGroupes = responses.flatMap((res) => res.data);
        const unique = allGroupes.filter(
          (g, index, self) => index === self.findIndex((x) => x._id === g._id),
        );
        setGroupes(unique);
      })
      .catch((err) => console.log(err));
  }, [announcement?._id]);

  useEffect(() => {
    api
      .get("/filieres")
      .then((res) => setFilieres(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleFiliereChange = (e) => {
    const value = e.target.value;
    const selected = typeof value === "string" ? value.split(",") : value;

    setFormData((prev) => ({ ...prev, filiere: selected, groupe: [] }));

    Promise.all(selected.map((id) => api.get(`/groupes/${id}`)))
      .then((responses) => {
        const allGroupes = responses.flatMap((res) => res.data);
        const unique = allGroupes.filter(
          (g, index, self) => index === self.findIndex((x) => x._id === g._id),
        );
        setGroupes(unique);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "groupe"
          ? typeof value === "string"
            ? value.split(",")
            : value
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("filiere", JSON.stringify(formData.filiere));
      data.append("groupe", JSON.stringify(formData.groupe));
      if (attachment) data.append("attachment", attachment);

      await api.put(`/announcements/${announcement._id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Announcement updated successfully");
      handleClose();
      fetchAnnouncements();
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Modifier une annonce</DialogTitle>
      <DialogContent>
        <form id="modify-announcement-form" onSubmit={handleSubmit}>
          <TextField
            style={{ marginTop: "10px" }}
            label="Titre"
            name="title"
            fullWidth
            value={formData.title}
            onChange={handleChange}
            required
          />
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
                if (selected.length === 0) return <em>Filière</em>;
                return filieres
                  .filter((f) => selected.includes(f._id))
                  .map((f) => f.nom)
                  .join(", ");
              }}
              MenuProps={MenuProps}
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
                if (selected.length === 0) return <em>Groupe</em>;
                return groupes
                  .filter((g) => selected.includes(g._id))
                  .map((g) => g.nom)
                  .join(", ");
              }}
              MenuProps={MenuProps}
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
          {announcement?.attachment && (
            <p style={{ marginTop: "10px" }}>
              Current file: <strong>{announcement.attachment}</strong>
            </p>
          )}
          <TextField
            style={{ marginTop: "10px" }}
            type="file"
            fullWidth
            onChange={(e) => setAttachment(e.target.files[0])}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button
          type="submit"
          form="modify-announcement-form"
          variant="contained"
        >
          Modifier
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModifyAnnouncementModal;
