import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Paper,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const initial = { bookname: "", release: 0, authour: "", buyFrom: [], desc: "" };

const Create = () => {
  const vendors = [
    { name: "Amazon" },
    { name: "Target" },
    { name: "Walmart" },
    { name: "Barnes & Noble" },
    { name: "BestBuy" }
  ];

  const navigate = useNavigate();
  const [form, setForm] = useState(initial);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/addBook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => console.log(response))
      .then((data) => {
        console.log("Success:", data);
        window.location.reload(); 
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    navigate('/books/feed');
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setForm({ ...form, buyFrom: [...form.buyFrom, value] });
    } else {
      setForm({ ...form, buyFrom: form.buyFrom.filter((vendor) => vendor !== value) });
    }
  };

  return (
    <Paper sx={{ padding: "2%" }} elevation={3}>
      <Typography sx={{ margin: "3% auto" }} align="center" variant="h5">
        Add your Book so that people can buy it.
      </Typography>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <TextField
            type="string"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) => setForm({ ...form, bookname: e.target.value })}
            label="Book Name"
            variant="outlined"
            value={form.bookname}
          />
          <TextField
            min="0"
            type="number"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) => setForm({ ...form, release: e.target.value })}
            label="Release Date"
            variant="outlined"
            value={form.release}
          />
          <TextField
            type="string"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) => setForm({ ...form, authour: e.target.value })}
            label="authour Name"
            variant="outlined"
            value={form.authour}
          />
          <TextField
            type="string"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            multiline
            rows={4}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            label="Book Description"
            variant="outlined"
            value={form.desc}
          />
          <Box sx={{ margin: "1% auto" }}>
            <h3>Update Your Vendors</h3>
            <ul>
              {vendors?.map(({ name }, index) => (
                                <li key={index}>
                                <div>
                                  <div>
                                    <input
                                      type="checkbox"
                                      id={`custom-checkbox-${index}`}
                                      name={name}
                                      value={name}
                                      onChange={handleChange}
                                      checked={form.buyFrom.includes(name)}
                                    />
                                    <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </Box>
                        <Button
                          sx={{ width: "50%", margin: "2% auto" }}
                          variant="contained"
                          type="submit"
                        >
                          Submit Your Book
                        </Button>
                      </Box>
                    </form>
                  </Paper>
                );
              };
              
              export default Create;
              
