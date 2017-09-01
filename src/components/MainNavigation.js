import React from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';

const MainNavigation = () => (
  <Navbar collapseOnSelect fixedTop inverse className="main-navigation">
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">MortyChess</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <NavItem eventKey={1} href="#">
          Engine
        </NavItem>
        <NavItem eventKey={1} href="#">
          Methodology
        </NavItem>
        <NavItem eventKey={1} href="#">
          Download
        </NavItem>
        <NavItem eventKey={1} href="#">
          About
        </NavItem>
        <NavItem eventKey={2} href="#">
          Contact
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default MainNavigation;
