import React from "react";
import Navbar from "../components/Navbar";

import { Grid } from "@mui/material";
import UserRequestCard from "../components/UserRequestCard";
import Container from "@mui/material/Container";

const pendingUsers = [
  {
    id: 1,
    name: "Yassine El Fassi",
    email: "yassine@mail.com",
    filiere: "Développement Digital",
    role: "Stagiaire",
  },
  {
    id: 2,
    name: "Sara Ben Ali",
    email: "sara@mail.com",
    filiere: "Réseaux",
    role: "Formateur",
  },
  {
    id: 2,
    name: "Sara Ben Ali",
    email: "sara@mail.com",
    filiere: "Réseaux",
    role: "Formateur",
  },
  {
    id: 2,
    name: "Sara Ben Ali",
    email: "sara@mail.com",
    filiere: "Réseaux",
    role: "Formateur",
  },
  {
    id: 2,
    name: "Sara Ben Ali",
    email: "sara@mail.com",
    filiere: "Réseaux",
    role: "Formateur",
  },
  {
    id: 2,
    name: "Sara Ben Ali",
    email: "sara@mail.com",
    filiere: "Réseaux",
    role: "Formateur",
  },
];
export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <Container
        maxWidth="lg"
        style={{
          marginTop: "20px",
        }}
      >
        <Grid container spacing={3}>
          {pendingUsers.map((user) => (
            <Grid item xs={12} md={6} key={user.id}>
              <UserRequestCard user={user} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
