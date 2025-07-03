import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { FaSun, FaMoon, FaFilm } from "react-icons/fa";
import "./AppNavbar.css";

function AppNavbar({ toggleTheme, isDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar
      expand="lg"
      variant={isDarkMode ? "dark" : "light"}
      className={`app-navbar ${scrolled ? "navbar-scrolled" : ""}`}
      fixed="top"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <FaFilm size={22} />
          <span>MovieApp</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" active={location.pathname === "/"}>
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/favorites"
              active={location.pathname === "/favorites"}
            >
              Favorites
            </Nav.Link>
          </Nav>
          <Button
            onClick={toggleTheme}
            variant={isDarkMode ? "outline-light" : "outline-dark"}
            className="theme-toggle-btn d-flex align-items-center gap-2"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
            <span className="d-none d-md-inline">
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </span>
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
