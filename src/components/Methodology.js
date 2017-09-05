import React from 'react';
import { ListGroup, ListGroupItem, Grid } from 'react-bootstrap';

const Methodology = () => (
  <div className="methodology">
    <Grid>
      <h1>Methodology</h1>
      <p>
        MortyChess implements several features to improve engine strength. If
        you're the kinda person that's interested in this stuff, some of the
        features we implemented (bear with us):
      </p>
      <ListGroup>
        <ListGroupItem
          header="1. Bitboards"
          href="https://chessprogramming.wikispaces.com/Magic+Bitboards"
          target="_blank"
          rel="noopener noreferrer"
        >
          Our board representation is a 64-bit integer as opposed to an object.
          This enables lightning-quick move generation (i.e. magic bitboards).
        </ListGroupItem>
        <ListGroupItem
          header="2. Transposition Table"
          href="https://chessprogramming.wikispaces.com/Transposition+Table"
          target="_blank"
          rel="noopener noreferrer"
        >
          Every position the engine searches through gets stored in a gigantic
          lookup table. If it encounters the same position at a different time
          in the search (i.e. a "transposition"), it just uses that stored
          evaluation.
        </ListGroupItem>
        <ListGroupItem
          header="3. Complex Move Reordering"
          href="https://chessprogramming.wikispaces.com/Move+Ordering"
          target="_blank"
          rel="noopener noreferrer"
        >
          We employ all kinds of move order techniques - some standard, some of
          our own invention - to optimize the search efficiency (exploring
          strong moves first = better performance).
        </ListGroupItem>
        <ListGroupItem
          header="4. Sophisticated Evaluation Function"
          href="https://chessprogramming.wikispaces.com/Evaluation+function"
          target="_blank"
          rel="noopener noreferrer"
        >
          A Chess Master with a FIDE rating greater than 2300 helped design our
          evaluation function. 'Nuff said.
        </ListGroupItem>
      </ListGroup>
      <p>
        Is your interest piqued? Are you eager to help bring MortyChess to the
        next level? Checkout our open-source code on{' '}
        <a
          href="https://github.com/nscorley/morty-chess"
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>, and contribute! All pull requests welcome. See the project board
        for to-do tasks.
      </p>
    </Grid>
  </div>
);
export default Methodology;
