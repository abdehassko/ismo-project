import React from "react";
import Navbar from "../components/Navbar";

import { Grid, Typography } from "@mui/material";
import UserRequestCard from "../components/UserRequestCard";
import Container from "@mui/material/Container";
import api from "../api/axios";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [usersRequests, setUsersRequests] = useState([]);
  useEffect(() => {
    api
      .get("/usersRequests")
      .then((res) => setUsersRequests(res.data))
      .catch((err) => console.log(err));
  }, []);

  const acceptUser = async (id) => {
    await api.put(`/accept-user/${id}`);
    setUsersRequests((prev) => prev.filter((user) => user._id !== id));
  };

  const rejectUser = async (id) => {
    await api.delete(`/reject-user/${id}`);
    setUsersRequests((prev) => prev.filter((user) => user._id !== id));
  };
  return (
    <div>
      <Navbar />
      <Container
        maxWidth="lg"
        style={{
          marginTop: "20px",
        }}
      >
        <Grid container spacing={10}>
          {usersRequests.length === 0 ? (
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
                <Typography
                  variant="h5"
                  sx={{ textAlign: "left", fontFamily: "CostumBold" }}
                >
                  Aucune demande d'inscription n'est trouvée
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ textAlign: "left", fontFamily: "CostumL" }}
                >
                  Cette page affiche les demandes d’inscription en attente de
                  validation. Lorsqu’un nouvel utilisateur soumet une demande,
                  elle apparaîtra ici.
                </Typography>
              </CardContent>
            </Card>
          ) : (
            usersRequests.map((user) => (
              <Grid item xs={12} md={6} key={user._id}>
                <UserRequestCard
                  user={user}
                  onAccept={acceptUser}
                  onReject={rejectUser}
                />
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </div>
  );
}
