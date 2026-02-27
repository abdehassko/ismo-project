import * as React from "react";
import Card from "@mui/material/Card";
import { Button } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

import CommentsModal from "../modals/CommentsModal";
import EditObjectModal from "../modals/EditObjectModal";
import { useState } from "react";
import api from "../api/axios";

export default function ObjectCard({
  object,
  setObjects,
  setOpenAddObject,
  publisher,
  role,
}) {
  const [openComments, setOpenComments] = useState(false);
  const [openEditObject, setOpenEditObject] = useState(false);

  const [modal, setModal] = useState(false);
  function handleDelete() {
    setModal(true);
  }

  function handleClose() {
    setModal(false);
  }

  const recovered = async (id) => {
    await api.put(`/recovered/${id}`);
    setObjects((prev) => prev.filter((object) => object._id !== id));
  };
  //datetime to str
  const pubdate = new Date(object.updatedAt).toLocaleString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card sx={{ maxWidth: 345 }}>
      {/*============DELETE POPUP===============*/}
      <Dialog
        onClose={handleClose}
        open={modal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{ fontFamily: "CostumBold" }}
        >
          Êtes-vous sûr de vouloir marquer cet object comme recupéré ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Attention, vous ne pourrez pas restaurer cet action ultérieurement.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => recovered(object._id)}
            style={{ color: "#1bd649" }}
            autoFocus
          >
            Confirmer la recupération
          </Button>
        </DialogActions>
      </Dialog>

      <CardHeader
        avatar={
          <Avatar
            src={`http://localhost:5000/uploads/users/${object.createdBy.image}`}
            aria-label="recipe"
          ></Avatar>
        }
        title={object.title}
        subheader={pubdate}
      />
      <CardMedia
        component="img"
        height="194"
        image={`http://localhost:5000/uploads/objects/${object.image}`}
        alt="photo..."
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {object.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton title={object.status === "lost" ? "perdu" : "trouvé"}>
          <PersonSearchIcon
            style={{
              color: object.status === "lost" ? "red" : "green",
            }}
          />
        </IconButton>
        <IconButton onClick={() => setOpenComments(true)} title="commentaires">
          <ChatBubbleIcon />
        </IconButton>
        {(publisher === object.createdBy._id || role === "admin") && (
          <IconButton onClick={() => setOpenEditObject(true)} title="modifier">
            <EditSquareIcon />
          </IconButton>
        )}
        {(publisher === object.createdBy._id || role === "admin") && (
          <IconButton
            onClick={() => handleDelete()}
            title="marquer comme récupérer"
            style={{ color: "#4d9efa" }}
          >
            <CheckCircleIcon />
          </IconButton>
        )}
      </CardActions>
      <CommentsModal
        open={openComments}
        handleClose={() => setOpenComments(false)}
        object={object}
      />
      <EditObjectModal
        open={openEditObject}
        handleClose={() => setOpenEditObject(false)}
        object={object}
      />
    </Card>
  );
}
