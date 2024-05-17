// client/src/components/Header.js
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Header = () => {
  return (
    <AppBar position="static" className="bg-gradient-to-r from-green-400 to-blue-500">
      <Toolbar>
        <Typography variant="h6" component="div" className="flex-grow">
          <span className="text-2xl font-bold text-white">BlogBook</span>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
