import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

function TransitionUp(props) {
  return <Slide {...props} direction='up' />;
}

const styles = theme => ({
  container: {
    display: 'grid',
  },
  textField: {
    width: 'auto',
    marginLeft: theme.spacing(3),
  },
  button: {
    marginTop: theme.spacing(2),
    width: 100,
    justifySelf: 'end',
  },
});

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: 'mon@email.com',
      password: 'monPassw0rd',
      passwordbis: 'monPassw0rd',
      name: 'James',
      lastname: 'Bond',
      flash: '',
      submitted: false,
      success: false,
    };

    this.updateInputField = this.updateInputField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateInputField(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = Transition => () => {
    fetch('/auth/signup', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(this.state),
    })
      .then(res => res.json())
      .then(
        res =>
          this.setState({
            flash: res.flash,
            submitted: true,
            Transition,
            success: true,
          }),
        err =>
          this.setState({
            flash: err.flash,
            submitted: true,
            Transition,
            success: false,
          }),
      );
  };

  handleClose = () => {
    this.setState({submitted: false});
  };

  render() {
    const {classes} = this.props;
    return (
      <div>
        <form className={classes.container}>
          <h1 style={{textAlign: 'center'}}>Sign Up!</h1>
          <TextField
            className={classes.textField}
            label='Email'
            type='email'
            name='email'
            autoComplete='email'
            margin='normal'
            onChange={this.updateInputField}
          />
          <TextField
            className={classes.textField}
            label='Password'
            type='password'
            autoComplete='current-password'
            margin='normal'
            onChange={this.updateInputField}
          />
          <TextField
            className={classes.textField}
            label='Confirm password'
            type='password'
            name='passwordbis'
            margin='normal'
            onChange={this.updateInputField}
          />
          <TextField
            className={classes.textField}
            label='First Name'
            autoComplete='name'
            margin='normal'
            type='text'
            name='name'
            onChange={this.updateInputField}
          />
          <TextField
            className={classes.textField}
            label='Last name'
            type='text'
            name='lastname'
            autoComplete='lastname'
            margin='normal'
            onChange={this.updateInputField}
          />
          <Button
            className={classes.button}
            variant='contained'
            color='primary'
            onClick={this.handleSubmit(TransitionUp)}>
            Submit
          </Button>
          {this.state.success ? (
            <Snackbar
              open={this.state.submitted}
              onClose={this.handleClose}
              TransitionComponent={this.state.Transition}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id='message-id'>{this.state.flash}</span>}
            />
          ) : (
            <Snackbar
              open={this.state.submitted}
              onClose={this.handleClose}
              TransitionComponent={this.state.Transition}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id='message-id'>{this.state.flash}</span>}
            />
          )}
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(SignUp);
