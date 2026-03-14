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

  const fullName = user?.fullName;
  const filiere = user?.filiere;
  const groupe = user?.groupe;

  const fetchAnnouncements = useCallback(async () => {
    try {
      const res = await api.get("/announcements", {
        params: {
          filiereId: user?.filiere,
          groupeId: user?.groupe._id,
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
        <div
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 24px",
            borderRadius: "12px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              color: "#ffffff",
              alignItems: "flex-start",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "20px",
                fontFamily: "CostumBold ",
                fontWeight: "600",
              }}
            >
              {fullName} ( {user.role} )
            </h3>
            {!isAdminOrFormateur && (
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  fontFamily: "CostumL ",
                  opacity: 0.9,
                }}
              >
                {filiere.nom} | {groupe.nom}
              </p>
            )}
          </div>
          {isAdminOrFormateur && (
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => setOpenAddAnnouncement(true)}
              style={{
                backgroundColor: "#ffffff",
                color: "#000000",
              }}
            >
              Ajouter une annonce
            </Button>
          )}
        </div>
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
