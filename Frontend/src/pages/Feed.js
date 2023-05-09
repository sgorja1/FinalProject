import {
  Box,
  Card,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  Button,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const Feed = () => {
  const [query, setQuery] = useState("");
  const [post, setPost] = useState();

  //
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(`http://localhost:8080/searchBooks/${query}`);
      setPost(response.data);
    };
    const fetchInitialPosts = async () => {
      const response = await axios.get(`http://localhost:8080/AllBooks`);
      const sortedPosts = response.data.sort((a, b) => b.release - a.release);
      console.log(sortedPosts);
      setPost(sortedPosts);
    };
    
    if (query.length === 0) fetchInitialPosts();
    if (query.length > 2) fetchPosts();
  }, [query]);
console.log(post);
  return (
    <div>
      <Box sx={{ backgroundColor: "#333333", color: "white", py: 2, textAlign: "center" }}>
      <Typography variant="h4" sx={{ textShadow: "2px 2px #000000", margin: "0", color: "white", fontSize: "24px", fontFamily: "Arial, sans-serif", fontWeight: "bold", letterSpacing: "1px" }}>
  All books from multiple sources
</Typography>
        <Button variant="contained" sx={{ mr: 2, backgroundColor: "#1976D2", color: "white", position: "absolute", top: 17, right: 1 }}>
  <Link to="/" style={{ color: "white" ,textDecoration: "none"}}>Home
  </Link>
</Button>
      </Box>

      <Grid container spacing={2} sx={{ margin: "1%",mt: "10px" }}>
        <Grid item xs={12} md={12} lg={12}>
        <Box sx={{
  width: "75%",
  padding: "2% auto",
  backgroundColor: "#fff",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
  borderRadius: "5px",
  display: "flex",
  alignItems: "center",
  "& .MuiInputBase-root": {
    fontSize: "1.5rem",
    fontWeight: "600",
  },
  "& .MuiInputBase-input": {
    marginLeft: "10px",
  },
  "& .MuiInputAdornment-root": {
    color: "#585858",
  },
}}>
  <TextField
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      ),
    }}
    placeholder="Search and Buy books from Multiple repositories..."
    fullWidth
    onChange={(e) => setQuery(e.target.value)}
  />
</Box>

        </Grid>
        {post &&
          post?.map((p) => {
            return (
              <Grid key={p.bookname} item xs={12} md={6} lg={4}>
                <Card sx={{ 
  padding: "3%", 
  overflow: "hidden", 
  width: "84%",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
  backgroundColor: "#f5f5f5",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.02)"
  }
}}>
  <Typography variant="h5" sx={{ fontSize: "2rem", fontWeight: "600" }}>
    {p.bookname}
  </Typography>
  <Typography sx={{ color: "#585858", marginTop: "2%" }} variant="body">
    <b>Description : </b> {p.desc}
  </Typography>
  <br />
  <Typography variant="h6">
    <b>Release Year : </b> {p.release}
  </Typography>
  <Typography sx={{ color: "#585858", marginTop: "2%" }} variant="body">
    <b>Author:</b> {p.authour}
  </Typography>
  <br />
  <Typography gutterBottom variant="body">
    <b>Buy From : </b>{" "}
  </Typography>
  {p.buyFrom?.map((s, i) => {
    return (
      <Typography variant="body" gutterBottom key={i}>
  <a href={s} target="_blank" rel="noopener noreferrer">{s}</a> ,
  {` `}
</Typography>

    );
  })}
</Card>

              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};

export default Feed;
