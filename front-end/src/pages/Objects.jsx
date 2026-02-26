import React from "react";
import Navbar from "../components/Navbar";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Container from "@mui/material/Container";
import ObjectCard from "../components/ObjectCard";
import Grid from "@mui/material/Grid";
import AddObjectModal from "../modals/AddObjectModal";

import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Objects() {
  const [openAddObject, setOpenAddObject] = useState(false);
  const [objects, setObjects] = useState([]);

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
        <Button
          variant="outlined"
          onClick={() => setOpenAddObject(true)}
          startIcon={<AddIcon />}
          style={{
            backgroundColor: "#ffffff",
            color: "#000000",
            marginRight: "-160vh",
          }}
        >
          Ajouter un objet perdu
        </Button>

        <Grid
          style={{ marginTop: 20 }}
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {objects.map((object) => (
            <Grid key={object._id} size={{ xs: 2, sm: 4, md: 4 }}>
              <ObjectCard object={object} setOpenAddObject={setOpenAddObject} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <AddObjectModal
        open={openAddObject}
        handleClose={() => setOpenAddObject(false)}
      />
    </div>
  );
}
