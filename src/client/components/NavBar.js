import React from 'react';
import {
  Button,
  Form,
  Navbar,
  Nav
} from 'react-bootstrap';

const NavBar = () => (
  <Navbar bg="primary" variant="dark" className="mb-3">
    <Navbar.Brand href="#home">LOGO</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Jobs</Nav.Link>
      <Nav.Link href="#features">Recruiters</Nav.Link>
    </Nav>
    <Form inline>
      <Button variant="outline-light">Login</Button>
    </Form>
  </Navbar>
);

export default NavBar;
