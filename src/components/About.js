import React from 'react';
import { Grid, ListGroup, ListGroupItem } from 'react-bootstrap';

const About = () => (
  <div className="about">
    <Grid>
      <h1>About</h1>
      <p>
        MortyChess was created by Nathaniel Corley and Stiven Deleur. It's grown
        overtime - to our considerable surprise - into one of the strongest C++
        chess engines.
      </p>
      <p>
        You may be wondering - how, exactly, does this chess engine relate to
        the populate animated comedy Rick & Morty? I will propose two answers to
        this question, pick amongst them as you see fit.
      </p>
      <ListGroup>
        <ListGroupItem>
          <p>
            <strong>Option 1.</strong> As a wise Rick once quipped, "Sometimes
            science is more art than science, Morty. Lot of people don't get
            that." Indeed, MortyChess transcends engineering - it's nuanced
            evaluation function required creative thinking and an allowance of
            non-standard approaches. Since RickChess would be too presumptuous
            (how can anything compare to Rick?), MortyChess was born.
          </p>
        </ListGroupItem>
        <ListGroupItem>
          <p>
            <strong>Option 2.</strong> We're Rick & Morty fans, and couldn't
            come up with anything better sounding than MortyChess.
          </p>
        </ListGroupItem>
      </ListGroup>
    </Grid>
  </div>
);
export default About;
