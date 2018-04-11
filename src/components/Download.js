import React from 'react';
import { Image, Row, Col, Grid } from 'react-bootstrap';
import downloadIcon from '../assets/download-icon.png';
import githubIcon from '../assets/github-icon.png';
import mortyChessZip from '../assets/morty-chess.zip';

const Download = () => (
  <div className="download">
    <Grid>
      <Row>
        <Col xs={12}>
          <h1>Download</h1>
          <p>
            If you would like to run MortyChess on your local machine (in a
            chess GUI, for example), check out the links below. Either download
            from the github repository and hunt down the executable, or directly
            download the most recent version.
          </p>
        </Col>
      </Row>
      <br />
      <Row className="download-icons">
        <Col xs={12} sm={6} className="github-icon">
          <a
            href="https://github.com/nscorley/morty-chess"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image circle src={githubIcon} />
          </a>
        </Col>
        {/*  TODO: add readme to zip archive */}
        <Col xs={12} sm={6}>
          <a href={mortyChessZip} download="morty-chess.zip">
            <Image circle src={downloadIcon} />
          </a>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <p>
            Not sure how to locally run MortyChess? We use{' '}
            <a
              href="https://sourceforge.net/projects/scidvspc/files/mac/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Scid vs. Mac
            </a>{' '}
            for OSX and{' '}
            <a
              href="http://www.playwitharena.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Arena
            </a>{' '}
            for windows.
          </p>
        </Col>
      </Row>
    </Grid>
  </div>
);
export default Download;
