import React from "react";
import Navbar from "../components/Navbar";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Container from "@mui/material/Container";
import AnnouncementCard from "../components/AnnouncementCard";
import { useEffect, useState, useCallback } from "react";
import AddAnnouncementModal from "../modals/AddAnnouncementModal";
import api from "../api/axios";
import { getUser } from "../auth";

export default function Announcements() {
  const [openAddAnnouncement, setOpenAddAnnouncement] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const user = getUser();
  const isAdminOrFormateur =
    user?.role === "admin" || user?.role === "formateur";

  const fetchAnnouncements = useCallback(async () => {
    try {
      const res = await api.get("/announcements", {
        params: {
          filiereId: user?.filiere,
          groupeId: user?.groupe,
          role: user?.role,
        },
      });
      setAnnouncements(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [user]); // dependency

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  return (
    <div>
      <Navbar />
      <Container maxWidth="lg" style={{ marginTop: "20px" }}>
        {isAdminOrFormateur && (
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
            Ajouter une annonce
          </Button>
        )}
        {Array.isArray(announcements) &&
          announcements.map((a) => (
            <AnnouncementCard
              key={a._id}
              announcements={a}
              fetchAnnouncements={fetchAnnouncements}
            />
          ))}
      </Container>
      <AddAnnouncementModal
        open={openAddAnnouncement}
        handleClose={() => setOpenAddAnnouncement(false)}
        fetchAnnouncements={fetchAnnouncements}
      />
    </div>
  );
}
