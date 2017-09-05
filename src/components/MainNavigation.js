import React from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';

import Scroll from 'react-scroll'; // Imports all Mixins
import { scroller } from 'react-scroll'; //Imports scroller mixin, can use as scroller.scrollTo()

let scroll = Scroll.animateScroll;

const MainNavigation = ({ scrollToElement }) => (
  <Navbar collapseOnSelect fixedTop inverse className="main-navigation">
    <Navbar.Header>
      <Navbar.Brand
        onClick={() =>
          scroll.scrollToTop({ smooth: true, duration: 1500, delay: 100 })}
      >
        MortyChess
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <NavItem onClick={() => scrollToElement('engine')}>Engine</NavItem>
        <NavItem onClick={() => scrollToElement('methodology')}>
          Methodology
        </NavItem>
        <NavItem onClick={() => scrollToElement('download')}>Download</NavItem>
        <NavItem onClick={() => scrollToElement('about')}>About</NavItem>
        <NavItem onClick={() => scrollToElement('contact')}>Contact</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default MainNavigation;
