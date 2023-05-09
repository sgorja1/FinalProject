import React, { useState } from 'react';
import { Box, Tab, Typography } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Button } from "@mui/material";
import { Link, useNavigate,useLocation  } from "react-router-dom";
import Create from './Create';
import UpdateDesc from './UpdateDesc';
import DeleteBook from './DeleteBook';
import { capitalize } from "lodash";

export default function Home() {
  const [value, setValue] = useState('1');
  const navigate = useNavigate();
  const location = useLocation();
  const username = new URLSearchParams(location.search).get("username");



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      <Box sx={{ backgroundColor: "#333333", color: "white", py: 2, textAlign: "center" }}>
        <Typography variant="h4" sx={{ textShadow: "2px 2px #000000", margin: "0", color: "white", fontSize: "24px", fontFamily: "Arial, sans-serif", fontWeight: "bold", letterSpacing: "1px" }}>
        Hello, {capitalize(username)}! Add or Manage a book
        </Typography>
        <Button variant="contained" sx={{ mr: 2, backgroundColor: "#1976D2", color: "white", position: "absolute", top: 17, right: 1 }} onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Add Book to the Library" value="1" />
              <Tab label="Update Your Book Description" value="2" />
              <Tab label="Delete Your Book" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1"><Create /></TabPanel>
          <TabPanel value="2"><UpdateDesc /></TabPanel>
          <TabPanel value="3"><DeleteBook /></TabPanel>
        </TabContext>
      </Box>
    </>
  );
}
