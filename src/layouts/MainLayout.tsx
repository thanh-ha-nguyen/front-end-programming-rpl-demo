import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link, Outlet, useNavigate } from "react-router";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
  cssVariables: true,
});

const pages = [
  { title: "Customers", path: "/customers" },
  { title: "Trainings", path: "/trainings" },
];

function MainLayout() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (path?: string) => () => {
    setAnchorElNav(null);
    if (path) {
      navigate(path);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth="md"
        disableGutters
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <AppBar position="static">
          <Container>
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component={Link}
                to="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                TRAINER APP
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu()}
                  sx={{ display: { xs: "block", md: "none" } }}
                >
                  {pages.map((page, index) => (
                    <MenuItem
                      key={index}
                      onClick={handleCloseNavMenu(page.path)}
                    >
                      <Typography sx={{ textAlign: "center" }}>
                        {page.title}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                TRAINER APP
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page, index) => (
                  <Button
                    key={index}
                    onClick={handleCloseNavMenu(page.path)}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.title}
                  </Button>
                ))}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Container sx={{ flexGrow: 1, my: 1 }}>
          <Outlet />
        </Container>
      </Container>
    </ThemeProvider>
  );
}

export default MainLayout;
