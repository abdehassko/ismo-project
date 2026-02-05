import { Card, CardContent, Typography, Button, Stack } from "@mui/material";

export default function UserRequestCard({ user }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{user.name}</Typography>
        <Typography>Email: {user.email}</Typography>
        <Typography>Filière: {user.filiere}</Typography>
        <Typography>Rôle: {user.role}</Typography>

        <Stack direction="row" spacing={2} mt={2}>
          <Button variant="contained" color="success">
            Accepter
          </Button>
          <Button variant="outlined" color="error">
            Bloquer
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
