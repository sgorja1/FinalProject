import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Snackbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const UpdateDesc = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");
  const [isDescriptionUpdated, setIsDescriptionUpdated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the book's description in the database
    fetch(`http://localhost:8080/books/description/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(description),
    })
      .then(() => {
        console.log("Success: Description updated", description);
        setIsDescriptionUpdated(true);
      })
      .catch((error) => console.error(error));
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCloseSnackbar = () => {
    setIsDescriptionUpdated(false);
  };

  return (
    <Paper sx={{ padding: "2%" }} elevation={3}>
      <Typography sx={{ margin: "3% auto" }} align="center" variant="h5">
        Update Book Description
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
            value={id}
            onChange={handleIdChange}
          />

          <TextField
            type="text"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            multiline
            rows={2}
            label="New Description"
            variant="outlined"
            value={description}
            onChange={handleDescriptionChange}
          />
          <Button sx={{ width: "50%", margin: "2% auto" }} variant="contained" type="submit">
            Update Description
          </Button>
        </Box>
      </form>
      <Snackbar
        open={isDescriptionUpdated}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Book description updated successfully!"
      />
    </Paper>
  );
};

export default UpdateDesc;
