import React from "react";
import Navbar from "../components/Navbar";

import { Grid } from "@mui/material";
import UserRequestCard from "../components/UserRequestCard";
import Container from "@mui/material/Container";
import api from "../api/axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [usersRequests, setUsersRequests] = useState([]);
  useEffect(() => {
    api
      .get("/usersRequests")
      .then((res) => setUsersRequests(res.data))
      .catch((err) => console.log(err));
  }, []);
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
          {usersRequests.map((user) => (
            <Grid item xs={12} md={6} key={user.id_}>
              <UserRequestCard user={user} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
