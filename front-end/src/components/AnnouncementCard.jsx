import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useState } from "react";
import ModifyAnnouncementModal from "../modals/ModifyAnnouncementModal";
import { getUser } from "../auth";
import api from "../api/axios";

export default function AnnouncementCard(props) {
  const [openModifyAnnouncement, setOpenModifyAnnouncement] = useState(false);
  const user = getUser();
  const isAdminOrFormateur =
    user?.role === "admin" || user?.role === "formateur";

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this announcement?"))
      return;
    try {
      await api.delete(`/announcements/${props.announcements._id}`);
      alert("Announcement deleted successfully");
      props.fetchAnnouncements();
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  const handleDownload = () => {
    if (!props.announcements.attachment) {
      alert("No attachment available");
      return;
    }
    const url = `http://localhost:5000/uploads/announcements/${props.announcements.attachment}`;
    const link = document.createElement("a");
    link.href = url;
    link.download = props.announcements.attachment;
    link.click();
  };

  return (
    <Card
      className="card-hov"
      sx={{
        minWidth: 275,
        color: "white",
        background: "#283593",
        marginTop: 5,
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={8}>
            <Typography
              variant="h5"
              sx={{ textAlign: "left", fontFamily: "CostumBold" }}
            >
              {props.announcements.title}
            </Typography>
            <Typography
              variant="h6"
              sx={{ textAlign: "left", fontFamily: "CostumL" }}
            >
              {props.announcements.description}
            </Typography>
          </Grid>
          <Grid
            size={4}
            display="flex"
            justifyContent="space-around"
            alignItems="center"
          >
            <IconButton
              className="hover-btn"
              aria-label="attachment"
              onClick={handleDownload}
              style={{
                color: "white",
                background: "#8bc34a",
                border: "solid #8bc34a 3px",
                opacity: props.announcements.attachment ? 1 : 0.4,
              }}
            >
              <AttachFileIcon />
            </IconButton>

            {isAdminOrFormateur && (
              <>
                <IconButton
                  className="hover-btn"
                  aria-label="edit"
                  onClick={() => setOpenModifyAnnouncement(true)}
                  style={{
                    color: "#1769aa",
                    background: "white",
                    border: "solid #1769aa 3px",
                  }}
                >
                  <ModeEditOutlineOutlinedIcon />
                </IconButton>
                <IconButton
                  className="hover-btn"
                  aria-label="delete"
                  onClick={handleDelete}
                  style={{
                    color: "#b23c17",
                    background: "white",
                    border: "solid #b23c17 3px",
                  }}
                >
                  <DeleteOutlinedIcon />
                </IconButton>
              </>
            )}
          </Grid>
        </Grid>
      </CardContent>
      <ModifyAnnouncementModal
        open={openModifyAnnouncement}
        handleClose={() => setOpenModifyAnnouncement(false)}
        announcement={props.announcements}
        fetchAnnouncements={props.fetchAnnouncements}
      />
    </Card>
  );
}
