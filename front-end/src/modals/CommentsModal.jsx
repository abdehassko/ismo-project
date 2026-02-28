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

import { useState, useEffect } from "react";
import api from "../api/axios";
import { getUser } from "../auth";

const user = getUser();

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

export default function CommentsModal({
  open,
  handleClose,
  setShowSuccess,
  object,
}) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/comments/${object._id}`);

      setComments(res.data);
      console.log(comments);
    } catch (error) {
      console.log("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && object?._id) {
      fetchComments();
    }
  }, [open, object]);
  const [error, setError] = useState({});

  const validate = async () => {
    let newError = {};

    if (!newComment.trim()) {
      newError.errnewComment = "Comment est obligatoire";
    }
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    const isValid = await validate();
    if (!isValid) return;

    try {
      const res = await api.post(`/comments/`, {
        content: newComment,
        object: object._id,
        author: user.id,
      });
      console.log(res);

      setComments(res.data);
      setNewComment("");
      setError({});
      fetchComments();
    } catch (error) {
      console.log(error);
    }
    setShowSuccess(true);
  };

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
        <Box
          sx={{
            mt: 2,
            mb: 2,
            maxHeight: 300,
            overflowY: "auto",
          }}
        >
          {loading ? (
            <Typography>Chargement...</Typography>
          ) : comments?.length ? (
            comments.map((c, i) => (
              <Box
                key={i}
                sx={{
                  mb: 2,
                  p: 2,
                  bgcolor: "white",
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                  "&:hover": { boxShadow: "0 4px 8px rgba(0,0,0,0.12)" },
                  display: "flex",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    bgcolor: "#1976d2",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "bold",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={`http://localhost:5000/uploads/users/${c.userId?.image}`}
                    alt={c.userId?.fullName?.charAt(0).toUpperCase()}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography fontWeight="bold" variant="subtitle2">
                    {c.userId?.fullName} ( {c.userId?.role} {}
                    {c.userId?.role === "admin"
                      ? undefined
                      : "–" + c.userId?.groupe.nom}
                    )
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mt: 0.5, color: "text.secondary" }}
                  >
                    {c.content}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.disabled" }}>
                    {new Date(c.createdAt).toLocaleString()}
                  </Typography>
                </Box>
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
          error={!!error.errnewComment}
          helperText={error.errnewComment}
          fullWidth
          multiline
          rows={2}
          placeholder="Ajouter un commentaire..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          sx={{ mt: 2 }}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleAddComment}
        >
          Publier
        </Button>
      </Box>
    </Modal>
  );
}
