import {
  Modal,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
};

export default function CommentsModal({ open, handleClose, object }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6">Commentaires – {object.title}</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        {/* Comments list */}
        <Box mt={2}>
          {object.comments?.length ? (
            object.comments.map((c, i) => (
              <Box key={i} mb={1}>
                <Typography fontWeight="bold">{c.author}</Typography>
                <Typography variant="body2">{c.text}</Typography>
              </Box>
            ))
          ) : (
            <Typography color="text.secondary">
              Aucun commentaire pour le moment
            </Typography>
          )}
        </Box>

        {/* Add comment */}
        <TextField
          fullWidth
          multiline
          rows={2}
          placeholder="Ajouter un commentaire..."
          sx={{ mt: 2 }}
        />

        <Button fullWidth variant="contained" sx={{ mt: 2 }}>
          Publier
        </Button>
      </Box>
    </Modal>
  );
}
