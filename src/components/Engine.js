import React from 'react';
import {
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Image,
  Grid,
  Col,
  Well,
  DropdownButton,
  MenuItem,
} from 'react-bootstrap';
import axios from 'axios';
import ChessBoard from 'chessboardjs';
import Chess from 'chess.js';
import BoredRick from '../assets/bored-rick.png';
import InfoIcon from '../assets/info-icon.png';

const MOVETIME = 2000;

// TODO: R&M chess pieces
// TODO: random R&M quote for waiting for move

const rickMessages = {
  check: (
    <span>
      <i>"Rikki-Tikki-Tavi, biatch!" - (Season 2, Episode 4)</i>
      <strong> Check.</strong>
    </span>
  ),
  draw: (
    <span>
      <i>
        "I want cookies and a 90-minute cut of Avatar." - (Season 3, Episode 5).
      </i>
      <strong> Draw.</strong>
    </span>
  ),
  enginewin: (
    <span>
      <i>
        "You're a piece of ****. Yeah. I can prove it mathematically. Actually,
        let me grab my white board. This has been a long time coming" - (Season
        2, Episode 1).
      </i>
      <strong> Checkmate.</strong>
    </span>
  ),
  thinking: (
    <span>
      <strong> Hmmm...</strong>
    </span>
  ),
  startup: (
    <span>
      <i>
        "And that's why I always say, "shum-shum-schlippety-dop!" - (Season 2,
        Episode 4).
      </i>
      <strong> Make a move.</strong>
    </span>
  ),
  yourmove: (
    <span>
      <i>"Get Schwifty!" - (Season 2, Episode 5).</i>
      <strong> Make a move.</strong>
    </span>
  ),
  engineloss: (
    <span>
      <i>
        "You're not going to believe this, because it usually never happens, but
        I made a mistake" - (Season 1, Episode 6).
      </i>
      <strong> You've checkmated the Rick.</strong>
    </span>
  ),
};

const standardMessages = {
  check: (
    <span>
      <strong> Check.</strong>
    </span>
  ),
  draw: (
    <span>
      <strong> Draw.</strong>
    </span>
  ),
  enginewin: (
    <span>
      <strong> Checkmate.</strong>
    </span>
  ),
  thinking: (
    <span>
      <strong> Hmmm...</strong>
    </span>
  ),
  startup: (
    <span>
      <strong> Make a move.</strong>
    </span>
  ),
  yourmove: (
    <span>
      <strong> Make a move.</strong>
    </span>
  ),
  engineloss: (
    <span>
      <strong> You've checkmated MortyChess. Well done.</strong>
    </span>
  ),
};

class Engine extends React.Component {
  state = {
    running: false,
    pieces: 'standard',
    message: 'startup',
    color: 'White',
  };

  componentDidMount() {
    this.startEngine();
    var cfg = {
      draggable: true,
      position: 'start',
      onDragStart: this.onDragStart,
      onDrop: this.onDrop,
      onSnapEnd: this.onSnapEnd,
      pieceTheme: 'https://s3-us-west-2.amazonaws.com/chessimg/{piece}.png',
      showNotation: false,
    };
    this.board = ChessBoard('board', cfg);
    this.game = new Chess();

    // attach event listener to window resize
    window.addEventListener('resize', this.updateDimensions);
  }

  handlePieceChange = pieces => {
    this.setState({ pieces });
  };

  handleColorChange = color => {
    this.board.orientation(color === 'White' ? 'white' : 'black');
    this.setState({ color });
    // trigger move if not thinking
    if (!this.state.thinking) {
      this.setState({ message: 'thinking' });
      this.engineMove();
    }
  };

  // resets board to the start position
  handleResetBoard = () => {
    this.game = new Chess();
    this.board.position(this.game.fen());
  };

  // update window dimensions stores in state
  updateDimensions = () => {
    this.board.resize();
  };

  // send an API request for the engine to start
  startEngine = () => {
    axios
      .get('/engine', {
        params: {
          type: 'startengine',
        },
      })
      .then(res => {
        this.setState({ running: true });
      })
      .catch(function(error) {
        console.log('Unable to start MortyChess!');
        console.log(error);
      });
  };

  checkDraw = () => {
    if (
      this.game.in_draw() ||
      this.game.in_stalemate() ||
      this.game.in_threefold_repetition()
    ) {
      // if there is a draw
      this.setState({ message: 'draw' });
    }
  };

  // do not pick up pieces if the game is over
  // only pick up pieces for the side to move
  onDragStart = (source, piece, position, orientation) => {
    const query = this.state.color === 'White' ? /^b/ : /^w/;
    if (
      this.game.game_over() === true ||
      piece.search(query) !== -1 ||
      this.state.thinking
    ) {
      return false;
    }
  };

  // trigger move on mouse release (if allowed)
  onDrop = (source, target) => {
    // see if the move is legal
    const move = this.game.move({
      from: source,
      to: target,
      promotion: 'q', // does not matter what piece promotion is for legality check
    });

    // illegal move
    if (move === null || !this.state.running) return 'snapback';

    if (this.game.in_checkmate()) {
      // if player checkmated engine
      this.setState({ message: 'engineloss' });
    } else {
      this.setState({ message: 'thinking' });
    }

    this.checkDraw();

    this.engineMove();
  };

  // triggers the engine to ponder a move and parses the response
  engineMove = () => {
    // otherwise the move is legal
    this.sendMove()
      .then(res => {
        // TODO: fix promotions
        // TODO: fix castling? check: 3rk2r/p3pppp/3p4/2p5/8/2P5/PP1PPPPP/RNBQKBNR b KQk - 0 1
        const move = res.data.response.split(' ')[1];
        const source = move.slice(0, 2);
        const target = move.slice(2, 4);
        const promotion = move.slice(4);
        console.log(promotion);
        const formattedMove = `${source}-${target}`;
        // move piece
        this.game.move({
          from: source,
          to: target,
          promotion: promotion || 'q', // promotion piece irrelevant if null
        });
        this.board.move(formattedMove);
        this.checkDraw();
        if (this.game.in_checkmate()) {
          this.setState({ message: 'enginewin' });
        } else if (this.game.in_check()) {
          this.setState({ message: 'check' });
        } else {
          this.setState({ message: 'yourmove' });
        }
      })
      .catch(function(error) {
        console.log('Error sending move!');
        console.log(error);
      });
  };

  // update the board position after the piece snap
  // for castling, en passant, pawn promotion
  onSnapEnd = () => {
    this.board.position(this.game.fen());
  };

  // send move to the engine
  // returns a promise that resolves when the engine finishes pondering
  sendMove = target => {
    return axios.get('/engine', {
      params: {
        type: 'command',
        cmdList: [`position ${this.game.fen()}`, `go movetime ${MOVETIME}`],
      },
    });
  };

  render() {
    return (
      <div className="engine">
        <div className="controls">
          <Button bsStyle="primary" onClick={this.handleResetBoard}>
            Reset
          </Button>{' '}
          <ToggleButtonGroup
            type="radio"
            name="options"
            onChange={this.handlePieceChange}
            value={this.state.pieces}
          >
            <ToggleButton value={'standard'}>Standard</ToggleButton>
            <ToggleButton value={'rick-and-morty'}>Rick & Morty</ToggleButton>
          </ToggleButtonGroup>{' '}
          <DropdownButton
            bsStyle="primary"
            title={this.state.color}
            id="color-switcher"
          >
            <MenuItem onClick={() => this.handleColorChange('White')}>
              White
            </MenuItem>
            <MenuItem onClick={() => this.handleColorChange('Black')}>
              Black
            </MenuItem>
          </DropdownButton>
        </div>
        <div id="board" />
        <div className="info-message">
          <Well>
            <Grid>
              <div className="message-holder">
                <Col xs={12} sm={2} className="avatar-holder">
                  <Image
                    src={
                      this.state.pieces === 'standard' ? InfoIcon : BoredRick
                    }
                  />
                </Col>
                <br />
                <Col xs={12} sm={10} className="text-holder">
                  <span>
                    MortyChess can't be run in the browser{' '}
                    <strong>
                      <i>yet</i>
                    </strong>. Please check back soon!
                  </span>
                  {/* {this.state.pieces === 'standard' ? (
                    standardMessages[this.state.message]
                  ) : (
                    rickMessages[this.state.message]
                  )} */}
                </Col>
              </div>
            </Grid>
          </Well>
        </div>
      </div>
    );
  }
}

export default Engine;
