import React from "react";
import Navbar from "../components/Navbar";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Container from "@mui/material/Container";
import ObjectCard from "../components/ObjectCard";
import Grid from "@mui/material/Grid";
import AddObjectModal from "../modals/AddObjectModal";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import { useEffect, useState } from "react";
import api from "../api/axios";
import { getUser } from "../auth";

const user = getUser();
const id = user?.id;
const fullName = user?.fullName;
const filiere = user?.filiere;
const groupe = user?.groupe;
const role = user?.role;

export default function Objects() {
  const [openAddObject, setOpenAddObject] = useState(false);
  const [objects, setObjects] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowSuccess(false);
  };

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const res = await api.get("/Objects");
        setObjects(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchObjects();
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <Container
        maxWidth="lg"
        style={{
          marginTop: "20px",
          Height: "100vh",
        }}
      >
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
              {fullName} ( {role} )
            </h3>
            {(role !== "admin" || role !== "admin") && (
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
          <Button
            variant="contained"
            onClick={() => setOpenAddObject(true)}
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: "#ffffff",
              color: "#000000",
            }}
          >
            Ajouter un objet perdu
          </Button>
        </div>

        <Grid
          style={{ marginTop: 20 }}
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {objects.map((object) => (
            <Grid key={object._id} size={{ xs: 2, sm: 4, md: 4 }}>
              <ObjectCard
                publisher={id}
                role={user.role}
                object={object}
                setObjects={setObjects}
                setOpenAddObject={setOpenAddObject}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      {showSuccess && (
        <Snackbar
          open={showSuccess}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Publiée avec success
          </Alert>
        </Snackbar>
      )}
      <AddObjectModal
        open={openAddObject}
        setShowSuccess={setShowSuccess}
        handleClose={() => setOpenAddObject(false)}
      />
    </div>
  );
}
