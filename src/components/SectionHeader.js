import React from 'react';
import { Jumbotron, Button, Image, Grid } from 'react-bootstrap';
import icon from '../assets/chess-icon.png';

const SectionHeader = ({ scrollToElement }) => (
  <div className="section-header">
    <Jumbotron style={{ textAlign: 'center' }}>
      <Grid>
        <Image src={icon} circle className="morty-chess-avatar" />
        <h1>MortyChess</h1>
        <p>A chess engine based on the wise teachings of Rick & Morty.</p>
        <p>
          <Button bsStyle="primary" onClick={() => scrollToElement('engine')}>
            Try it out
          </Button>
        </p>
      </Grid>
    </Jumbotron>
  </div>
);
export default SectionHeader;
