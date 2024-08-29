import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import '../styles/Navbar.css';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'; // Import the icons


interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const NavbarComponent: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => {
  return (
    <Navbar bg="light" variant="light" expand="lg" fixed="top" className="navbar-custom">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            alt='Sleepnb logo'
            width='225'
            height='100'
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="d-flex justify-content-between w-100">
            <Nav className="mx-auto navbar-menu">
              <Nav.Link as={Link} to="/properties">Propriétés</Nav.Link>
              <Nav.Link as={Link} to="/calendar">Calendrier des réservations</Nav.Link>
              <Nav.Link as={Link} to="/services-catalog">Catalogue des services</Nav.Link>
              <Nav.Link as={Link} to="/manageAccount">Mon compte</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              {isLoggedIn ? (
                <Nav.Link onClick={onLogout}><FaSignOutAlt /> Déconnexion</Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/login"><FaSignInAlt /> Connexion</Nav.Link>
              )}
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
