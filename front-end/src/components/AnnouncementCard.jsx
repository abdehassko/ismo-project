import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";

export default function AnnouncementCard(props) {
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
              aria-label="delete"
              style={{
                color: "white",
                background: " #8bc34a",
                border: "solid #8bc34a 3px",
              }}
            >
              <AttachFileIcon />
            </IconButton>
            <IconButton
              className="hover-btn"
              aria-label="delete"
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
              style={{
                color: "#b23c17",
                background: "white",
                border: "solid #b23c17 3px",
              }}
            >
              <DeleteOutlinedIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
