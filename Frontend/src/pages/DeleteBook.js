import React, { useState } from "react";
import { Typography, TextField, Button, Paper, Box, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DeleteBook = () => {
  const navigate = useNavigate();
  const [author, setAuthor] = useState("");
  const [isBookDeleted, setIsBookDeleted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Delete the book based on the author's name
    fetch(`http://localhost:8080/books/authour/${author}`, {
      method: "DELETE",
    })
      .then(() => {
        console.log("Success: Book deleted");
        setIsBookDeleted(true);
      })
      .catch((error) => console.error(error));
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleCloseSnackbar = () => {
    setIsBookDeleted(false);
  };

  return (
    <Paper sx={{ padding: "2%" }} elevation={3}>
      <Typography sx={{ margin: "3% auto" }} align="center" variant="h5">
        Delete Book
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <TextField
            type="text"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            label="Book ID"
            variant="outlined"
            value={author}
            onChange={handleAuthorChange}
          />
          <Button sx={{ width: "50%", margin: "2% auto" }} variant="contained" type="submit">
            Delete Book
          </Button>
        </Box>
      </form>
      <Snackbar
        open={isBookDeleted}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Book deleted successfully!"
      />
    </Paper>
  );
};

export default DeleteBook;
