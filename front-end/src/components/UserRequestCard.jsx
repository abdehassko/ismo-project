import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

import { useState } from "react";

export default function UserRequestCard({ user, onAccept, onReject }) {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  function handleDelete() {
    setModal(true);
  }
  function handleAccept() {
    setModal2(true);
  }
  function handleClose() {
    setModal(false);
  }

  function handleClose2() {
    setModal2(false);
  }

  return (
    <Card>
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
          Êtes-vous sûr de vouloir supprimer cet utilisateur ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Attention, vous ne pourrez pas restaurer cet utilisateur
            ultérieurement.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => onReject(user._id)}
            style={{ color: "#e43838" }}
            autoFocus
          >
            Confirmer la suppression
          </Button>
        </DialogActions>
      </Dialog>

      {/*============ACCEPT POPUP===============*/}
      <Dialog
        onClose={handleClose}
        open={modal2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{ fontFamily: "CostumBold" }}
        >
          Êtes-vous sûr de vouloir accepter cet utilisateur ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Attention, vous ne pourrez pas restaurer cet action ultérieurement.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2}>Cancel</Button>
          <Button
            onClick={() => onAccept(user._id)}
            style={{ color: "#3cb163" }}
            autoFocus
          >
            Confirmer l'acceptation
          </Button>
        </DialogActions>
      </Dialog>

      <CardContent>
        <Typography variant="h6">{user?.fullName}</Typography>
        <Typography>Email: {user?.email}</Typography>
        <Typography>Filière: {user?.filiere?.nom}</Typography>
        <Typography>Groupe: {user?.groupe?.nom}</Typography>
        <Typography>Rôle: {user?.role}</Typography>
        <div
          style={{ display: "flex", justifyContent: "center", margin: "10px" }}
        >
          <Avatar
            sx={{ width: 75, height: 75 }}
            alt="User photo ..."
            src={`http://localhost:5000/uploads/users/${user.image}`}
          />
        </div>
        <Stack direction="row" spacing={10} mt={3}>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleAccept()}
          >
            Accepter
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleDelete()}
          >
            Bloquer
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
