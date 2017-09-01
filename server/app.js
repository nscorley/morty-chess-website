// server/app.js
const express = require('express');
const path = require('path');
const { spawn } = require('child_process');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

// serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

//support parsing of application/json type post data
app.use(bodyParser.json());

// return the main index.html for GET requests to the homepwage
app.get('/', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

// initialize ls
let ls = null;

// whether the engine is live (avoids parsing welcome message)
let engineStarted = false;

// GET method route
app.get('/engine', (req, res) => {
  const type = req.query.type;
  // whether the headers have been sent
  let sent = false;

  // perform appropriate action based on request type parameter
  switch (type) {
    case 'startengine':
      ls = spawn(path.resolve(__dirname, 'morty-chess-benchmark'));
      ls.stdout.pipe(process.stdout);
      break;
    case 'stopengine':
      ls.disconnect();
      break;
    case 'command':
      req.query.cmdList.forEach(cmd => {
        ls.stdin.write(`${cmd}\n`);
      });
      break;
    default:
      break;
  }

  // handle executable stdout
  ls.stdout.on('data', data => {
    if (sent) return;

    if (!engineStarted) {
      ls.stdin.write(`uci\n`);
      engineStarted = true;
    } else {
      const lastOutput = data
        .toString()
        .trim()
        .split('\n')
        .slice(-1)
        .pop();
      const parsedLastOutput = lastOutput.split(' ')[0];

      // outputs from the executable that signal end of computations, configuration, etc.
      const terminations = ['uciok', 'bestmove'];

      // return lastOutput if it was a termination
      if (terminations.indexOf(parsedLastOutput) > -1) {
        sent = true;
        return res.send(
          JSON.stringify({
            response: lastOutput,
            ok: true,
          })
        );
      }
    }
  });
});

app.post('/email', (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mortychess@gmail.com',
      pass: 'zobristhash',
    },
  });
  const mailOptions = {
    from: req.body.email,
    to: 'nscorley@gmail.com',
    subject: `MortyChess Web Form Response From ${req.body.email}`,
    text: `From: ${req.body.email}\nMessage: ${req.body.message}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.send({ ok: false });
      console.log(error);
    } else {
      res.send({ ok: true });
    }
  });
});

module.exports = app;
