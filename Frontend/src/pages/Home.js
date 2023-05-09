import React, { useState, useEffect } from "react";
import { Typography, Button, TextField, Box, Card, CardContent, Grid, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CloseIcon from "@mui/icons-material/Close";
import "../App.css";

const Home = () => {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      if (query.trim() === "") {
        setPosts([]);
      } else {
        const response = await axios.get(`http://localhost:8080/searchBooks/${query}`);
        setPosts(response.data);
      }
    };

    fetchPosts();
  }, [query]);

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.trim() === "") {
      setPosts([]);
    }
  };

  const handleExpand = (index) => {
    if (expandedCard === index) {
      setExpandedCard(null);
    } else {
      setExpandedCard(index);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Perform login validation here
    if ((username === "admin" && password === "password") || (username === "santosh" && password === "1234")) {
      setIsLoggedIn(true);
      navigate(`/books/dashboard?username=${username}`);
    } else {
      // Show error message or handle invalid login
      alert("Invalid username or password");
    }
  };

  const handleShowLogin = () => {
    setShowLoginDialog(true);
  };

  const handleCloseLogin = () => {
    setShowLoginDialog(false);
  };

  return (
    <div>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#333333",
            color: "white",
            py: 2,
            px: 4,
            cursor: "pointer",
          }}
        >
          <Typography variant="body2" sx={{ margin: "0", color: "grey" }}>
            About
          </Typography>
          <Typography
            variant="h4"
            sx={{
              textShadow: "2px 2px #000000",
              margin: "0",
              color: "white",
              fontSize: "24px",
              fontFamily: "Arial, sans-serif",
              fontWeight: "bold",
              letterSpacing: "1px",
            }}
          >
            Welcome to the Book Store
          </Typography>

          <Button onClick={handleShowLogin} sx={{ textTransform: "none", color: "white" }}>
  Login
</Button>


        </Box>
      </Link>
      <img
        src={require("../logo.jpg")} // Replace with the path to your image
        alt="Books"
        style={{ display: "block", margin: "30px auto 0", width: "210px" }} // Add top margin of 20px
      />
            <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <TextField
          label="Search all books based on Title, Author, Description, etc."
          variant="outlined"
          size="large"
          margin="normal"
          sx={{
            width: "500px",
            borderRadius: "20px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px", // Update the border radius here
            },
            "&:hover": {
              backgroundColor: "#f0f0f0", // Update the color here
            },
          }}
          value={query}
          onChange={handleSearch}
        />
      </Box>

      <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          sx={{
            mr: 2,
            backgroundColor: "#1976D2",
            color: "white",
            "&:hover": { backgroundColor: "#333333" },
          }}
          
          onClick={handleShowLogin}
        >
          
          Add Your Book
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#1976D2", color: "white", "&:hover": { backgroundColor: "#333333" } }}
        >
          <Link to="/books/feed" style={{ color: "white", textDecoration: "none" }}>
            Buy A Book
          </Link>
        </Button>
      </Box>

      {isLoggedIn && (
        <Box sx={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1976D2",
              color: "white",
              "&:hover": { backgroundColor: "#333333" },
            }}
            onClick={() => setIsLoggedIn(true)}
          >
            Add Your Book
          </Button>
        </Box>
      )}

      {posts.length > 0 && (
        <Grid container spacing={2} sx={{ marginTop: "1%" }}>
          {posts.map((p, index) => (
            <Grid
              key={p.bookname}
              item
              xs={12}
              md={6}
              lg={4}
              sx={{ marginLeft: "20px", marginRight: "0.11px" }}
            >
              <Card
                onClick={() => handleExpand(index)}
                sx={{
                  padding: "1%",
                  overflow: "hidden",
                  width: "100%",
                  boxShadow: expandedCard === index ? "0px 4px 8px rgba(0, 0, 0, 0.1)" : "none",
                  borderRadius: "12px",
                  backgroundColor: "#D3D3D3",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transition: "transform 0.2s",
                  transform: expandedCard === index ? "scale(1.02)" : "scale(1)",
                  position: "relative", // Added for positioning the icons
                }}
              >
                <CardContent>
                  <Typography sx={{ fontSize: "1rem", fontWeight: "600" }}>{p.bookname}</Typography>
                  <Typography sx={{ color: "#585858", marginTop: "2%" }} variant="body">
                    Written By {p.authour}
                  </Typography>
                  <br />
                  {expandedCard === index ? (
                    <>
                      <Typography sx={{ color: "#585858", marginTop: "2%" }} variant="body">
                        <b>Description: </b>
                        {p.desc}
                      </Typography>
                      <br />
                      <Typography sx={{ color: "#585858", marginTop: "2%" }} variant="body">
                        <b>Release Year: </b> {p.release}
                      </Typography>
                      <br />
                      <Typography gutterBottom variant="body">
                        <b>Available at: </b>
                      </Typography>
                      {p.buyFrom?.map((s, i) => {
                        return (
                          <Typography variant="body" gutterBottom key={i}>
                            <a href={s} target="_blank" rel="noopener noreferrer">
                              {s}
                            </a>{" "}
                            ,
                            {` `}
                          </Typography>
                        );
                      })}
                    </>
                  ) : (
                    <Typography sx={{ marginTop: "2%" }} align="right">
                      <IconButton onClick={() => handleExpand(index)} size="small" sx={{ p: 0 }} aria-label="Expand">
                        <ExpandMoreIcon />
                      </IconButton>
                    </Typography>
                  )}
                </CardContent>
                {expandedCard === index && (
                  <Typography sx={{ marginTop: "2%" }} align="right">
                    <IconButton
                      onClick={() => handleExpand(index)}
                      size="small"
                      sx={{ p: 0 }}
                      aria-label="Collapse"
                    >
                      <ExpandLessIcon />
                    </IconButton>
                  </Typography>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {query && posts.length === 0 && (
        <Typography variant="body1" align="center">
          No results found.
        </Typography>
      )}

<Dialog open={showLoginDialog} onClose={handleCloseLogin}>
<DialogTitle sx={{ textAlign: "center" }}>Login to Add Your Book</DialogTitle>
  <DialogContent>
    <TextField
      label="Username"
      variant="outlined"
      margin="normal"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      sx={{ width: "100%", marginBottom: "1rem", borderRadius: "10px" }}
    />
    <TextField
      label="Password"
      variant="outlined"
      margin="normal"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      sx={{ width: "100%", marginBottom: "1rem", borderRadius: "10px" }}
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseLogin} color="secondary" sx={{ borderRadius: "10px" }}>
      Cancel
    </Button>
    <Button onClick={handleLogin} variant="contained" color="primary" sx={{ borderRadius: "10px" }}>
      Login
    </Button>
  </DialogActions>
</Dialog>

    </div>
  );
};

export default Home;
