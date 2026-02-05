import React from "react";
import Navbar from "../components/Navbar";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Container from "@mui/material/Container";
import AnnouncementCard from "../components/AnnouncementCard";
import { useState } from "react";
import AddAnnouncementModal from "../modals/AddAnnouncementModal";

const announcements = [
  {
    id: 1,
    title: "wejdwe",
    description: "jwedhwedh",
    date: "wedhwed",
    Filière: "wedhedh",
  },
  {
    id: 1,
    title: "wejdwe",
    description: "jwedhwedh",
    date: "wedhwed",
    Filière: "wedhedh",
  },
  {
    id: 1,
    title: "wejdwe",
    description: "jwedhwedh",
    date: "wedhwed",
    Filière: "wedhedh",
  },
  {
    id: 1,
    title: "wejdwe",
    description: "jwedhwedh",
    date: "wedhwed",
    Filière: "wedhedh",
  },
];

export default function Announcements() {
  const [openAddAnnouncement, setOpenAddAnnouncement] = useState(false);

  return (
    <div>
      <Navbar></Navbar>
      <Container
        maxWidth="lg"
        style={{
          marginTop: "20px",
        }}
      >
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => setOpenAddAnnouncement(true)}
          style={{
            backgroundColor: "#ffffff",
            color: "#000000",
            marginRight: "-170vh",
          }}
        >
          Ajouter une annoce
        </Button>
        {announcements.map((a) => {
          return <AnnouncementCard key={a.id} announcements={a} />;
        })}
      </Container>
      <AddAnnouncementModal
        open={openAddAnnouncement}
        handleClose={() => setOpenAddAnnouncement(false)}
      />
    </div>
  );
}
