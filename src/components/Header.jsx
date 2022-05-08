import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
//import IconButton from "@mui/material/IconButton";
//import MenuIcon from "@mui/icons-material/Menu";
//import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
//import Menu from "@mui/material/Menu";
//import MenuItem from "@mui/material/MenuItem";
//import AdbIcon from "@mui/icons-material/Adb";
import "./header.css";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="xl" sx={{ bgcolor: "white" }}>
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "black", ml: 5, mt: 1 }}
            >
              <img className="main_logo" src={require("../img/logo.png")} />
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                variant="text"
                sx={{ color: "black", display: { fontWeight: "bold" } }}
              >
                {" "}
                메인분석화면{" "}
              </Button>
              <Button
                variant="text"
                sx={{ color: "black", ml: 10, display: { fontWeight: "bold" } }}
              >
                {" "}
                지도/경로추천{" "}
              </Button>
              <Button
                variant="text"
                sx={{ color: "black", ml: 10, display: { fontWeight: "bold" } }}
              >
                {" "}
                커뮤니티{" "}
              </Button>
            </Box>
            <Button variant="contained" sx={{ bgcolor: "#474747", mr: 1 }}>
              {" "}
              로그인{" "}
            </Button>
            <Button
              variant="outlined"
              sx={{ color: "#00777d", border: 2, mr: 5 }}
            >
              회원가입
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
