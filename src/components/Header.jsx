import React from 'react';
import logo from '../assets/banwe_logo_text_green.png';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Header({ setCurrentComponent }) {
    const location = useLocation();
    const navigate = useNavigate();
  return (
    <div style={{ width: "100%" }}>
      <Navbar className="" variant="dark">
        <Container>
          <Navbar.Brand href="/banwe-landing-page/">
            <img src={logo} alt="oahse Logo" width="120px" />
          </Navbar.Brand>
          <Nav className="me-auto">
            {location.pathname === "/about" && (
              <Nav.Link as={Link} to='/'>Get Started</Nav.Link>
            )}
            <Nav.Link as={Link} to='/about'>About</Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            {/*  Padlock Icon start*/}
            <Navbar.Text
              style={{ cursor: "pointer", color: "#0d6efd" }} // Make it look clickable
               onClick={() => {
                if (location.pathname === "/about") {
                  navigate("/", { state: { showAccessStep: true } });
                } else {
                  setCurrentComponent && setCurrentComponent("AccessStep");
                }
              }}// Correctly set the component to "AccessStep"
            >
             <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="yellow" class="bi bi-lock-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4m0 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"/>
                </svg>            
            </Navbar.Text>
             {/*  Padlock Icon end*/}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;