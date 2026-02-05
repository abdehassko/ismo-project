import React from "react";
import Navbar from "../components/Navbar";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Container from "@mui/material/Container";
import ObjectCard from "../components/ObjectCard";
import Grid from "@mui/material/Grid";
import AddObjectModal from "../modals/AddObjectModal";
import { useState } from "react";

const objects = [
  {
    id: 1,
    title: "Sac noir",
    date: "2025-01-20",
    description: "Perdu à la cafétéria",
    comments: [
      { author: "Admin", text: "Vu près du bloc B" },
      { author: "Ali", text: "Je pense l’avoir trouvé" },
    ],
  },
  {
    id: 1,
    name: "farawee harbe",
    title: "wejdwe",
    description: "jwedhwedh",
    date: "wedhwed",
  },
  {
    id: 1,
    name: "farawee harbe",
    title: "wejdwe",
    description: "jwedhwedh",
    date: "wedhwed",
  },
  {
    id: 1,
    name: "farawee harbe",
    title: "wejdwe",
    description: "jwedhwedh",
    date: "wedhwed",
  },
  {
    id: 1,
    name: "farawee harbe",
    title: "wejdwe",
    description: "jwedhwedh",
    date: "wedhwed",
  },
];

export default function Objects() {
  const [openAddObject, setOpenAddObject] = useState(false);
  console.log("objects length:", objects.length);

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
          {objects.map((o) => (
            <Grid key={o.id} size={{ xs: 2, sm: 4, md: 4 }}>
              <ObjectCard objects={o} />
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
