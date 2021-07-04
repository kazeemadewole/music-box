/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import style from './Header.module.css';

const Header = () => {
  return (
    <div className={style.header}>
      <Navbar variant='dark' expand='md' fixed='top' className={style.header}>
        <Container>
          <Navbar.Brand href='/' className={style.headerDesign}>
            Music <br />
            Box
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <div className={style.navigation}>
                <div className={style.navLinks}>
                  <Nav.Link href='#' className={style.text}>
                    Download
                  </Nav.Link>
                  <Nav.Link href='#' className={style.text}>
                    Help
                  </Nav.Link>
                </div>
                <div className='ml-5'>
                  <NavLink to='/login'>
                    <Button className={style.button} style={{ background: 'transparent' }}>
                      Login
                    </Button>
                  </NavLink>
                  <NavLink to='/signup'>
                    <Button
                      className={style.button}
                      style={{ backgroundColor: 'white', color: 'black', marginLeft: '12px' }}
                    >
                      SignUp
                    </Button>
                  </NavLink>
                </div>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
