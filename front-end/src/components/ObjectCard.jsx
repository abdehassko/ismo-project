import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import Photo from "../S0-video-renault-clio-4-restylee-rendez-vous-lundi-pour-la-decouvrir-en-live-108992.jpg";

import CommentsModal from "../modals/CommentsModal";
import EditObjectModal from "../modals/EditObjectModal";
import { useState } from "react";

export default function ObjectCard(props) {
  const [openComments, setOpenComments] = useState(false);
  const [openEditObject, setOpenEditObject] = useState(false);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={props.objects.title}
        subheader={props.objects.date}
      />
      <CardMedia component="img" height="194" image={Photo} alt="photo..." />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {props.objects.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton title="état">
          <PersonSearchIcon />
        </IconButton>
        <IconButton onClick={() => setOpenComments(true)} title="commentaires">
          <ChatBubbleIcon />
        </IconButton>
        <IconButton onClick={() => setOpenEditObject(true)} title="modifier">
          <EditSquareIcon />
        </IconButton>
        <IconButton title="marquer comme récupérer">
          <CheckCircleIcon />
        </IconButton>
      </CardActions>
      <CommentsModal
        open={openComments}
        handleClose={() => setOpenComments(false)}
        object={props.objects}
      />
      <EditObjectModal
        open={openEditObject}
        handleClose={() => setOpenEditObject(false)}
        object={props.objects}
      />
    </Card>
  );
}
