import React from 'react';
import {
  Grid,
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  Modal,
} from 'react-bootstrap';
import axios from 'axios';

const emailRegex = /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

class Contact extends React.Component {
  state = {
    email: '',
    message: '',
    success: false,
    emailError: false,
    messageError: false,
    loading: false,
    show: false,
  };

  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  handleMessageChange = e => {
    this.setState({ message: e.target.value });
  };

  handleSubmit = () => {
    let errors = false;
    if (!emailRegex.test(this.state.email)) {
      console.log('Regex fails.');
      this.setState({ emailError: true });
      errors = true;
    } else {
      this.setState({ emailError: false });
      errors = false;
    }
    if (this.state.message.trim().length < 1) {
      this.setState({ messageError: true });
      errors = true;
    } else {
      this.setState({ messageError: false });
    }
    // stop execution if validation errors present
    if (errors) return;

    this.setState({ loading: true });

    // POST request to server
    axios
      .post('/email', {
        email: this.state.email,
        message: this.state.message,
      })
      .then(response => {
        if (response.data.ok) {
          this.setState({ success: true, email: '', message: '' });
        } else {
          this.setState({ success: false });
        }
        this.setState({ loading: false, show: true });
      })
      .catch(error => {
        this.setState({ success: false, show: true });
      });
  };

  close = () => {
    this.setState({ show: false });
  };

  render() {
    const {
      email,
      message,
      emailError,
      messageError,
      loading,
      success,
      show,
    } = this.state;
    return (
      <div className="contact">
        <Modal onHide={this.close} show={show}>
          <Modal.Header>
            <Modal.Title>{success ? 'Success!' : 'Error!'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {success ? (
              'The email was sent successfully. Please allow some time for a response.'
            ) : (
              'There was an error sending the email. Awkward.'
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button primary onClick={this.close}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Grid>
          <h1>Contact</h1>
          <p>
            Want to get in touch? Shoot us an email at&nbsp;
            <a href="mailto:mortychessai@gmail.com">
              mortychessai@gmail.com
            </a>
          </p>
          {/* <form>
            <FormGroup
              controlId="formControlEmail"
              validationState={emailError ? 'error' : null}
            >
              <ControlLabel>Email</ControlLabel>
              <FormControl
                value={email}
                type="email"
                placeholder="Enter email"
                onChange={this.handleEmailChange}
              />
            </FormGroup>
            <FormGroup
              controlId="formControlEmail"
              validationState={messageError ? 'error' : null}
            >
              <ControlLabel>Message</ControlLabel>
              <FormControl
                componentClass="textarea"
                placeholder="Enter message"
                value={message}
                onChange={this.handleMessageChange}
              />
            </FormGroup>
            <Button
              disabled={loading}
              bsStyle="primary"
              onClick={this.handleSubmit}
            >
              {loading ? 'Processing...' : 'Submit'}
            </Button>
          </form> */}
        </Grid>
      </div>
    );
  }
}
export default Contact;
