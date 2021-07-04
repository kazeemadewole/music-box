/* eslint-disable react/require-default-props */
import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';

interface prop {
  firstName?: string;
  logOut?: () => void;
}

const Header = ({ firstName, logOut }: prop) => {
  return (
    <div className=''>
      <Navbar collapseOnSelect expand='lg' variant='dark'>
        <Container fluid>
          <Navbar.Brand href='#home'>Music-Box</Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mr-auto'>
              <Nav.Link href='#features'>Browse</Nav.Link>
              <Nav.Link href='#pricing'>Library</Nav.Link>
              <Nav.Link href='#pricing'>Home</Nav.Link>
            </Nav>
            <Form className='d-flex'>
              <FormControl type='search' placeholder='Search' className='mr-2 rounded-pill' aria-label='Search' />
            </Form>
            <NavDropdown title={<span className='text-white my-auto'>{firstName}</span>} id='collasible-nav-dropdown'>
              <NavDropdown.Item href='#action/3.1'>Browse</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.2'>Library</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>Home</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logOut}>Log out</NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
