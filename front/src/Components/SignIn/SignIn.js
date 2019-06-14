import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import {Link, Redirect} from 'react-router-dom';

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
  link: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2),
    textAlign: 'center',
  },
});

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      flash: '',
      submitted: false,
      token: '',
    };

    this.updateInputField = this.updateInputField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
  }

  updateInputField = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = Transition => () => {
    const payload = {
      email: this.state.email,
      password: this.state.password,
    };
    fetch('/auth/signin', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(res =>
        res.token !== ''
          ? this.setState({
              submitted: true,
              Transition,
              token: res.token,
            })
          : this.setState({
              flash: res.flash,
              submitted: true,
              Transition,
              email: '',
              password: '',
            }),
      )
      .catch(err =>
        this.setState({
          flash: err.flash,
          submitted: true,
          Transition,
        }),
      );
  };

  handleClose = () => {
    this.setState({submitted: false});
  };

  renderRedirect = () => {
    if (this.state.token !== '') {
      return (
        <Redirect
          to={{pathname: '/profile', state: {token: this.state.token}}}
        />
      );
    }
  };

  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
        <form className={classes.container}>
          <h1 style={{textAlign: 'center'}}>Sign In!</h1>
          <TextField
            className={classes.textField}
            label='Email'
            type='email'
            name='email'
            autoComplete='email'
            margin='normal'
            onChange={this.updateInputField}
            value={this.state.email}
          />
          <TextField
            className={classes.textField}
            label='Password'
            type='password'
            autoComplete='current-password'
            margin='normal'
            onChange={this.updateInputField}
            name='password'
            value={this.state.password}
          />
          <Button
            className={classes.button}
            variant='contained'
            color='primary'
            onClick={this.handleSubmit(TransitionUp)}>
            {this.state.token !== '' ? (
              <Link to='/profile' />
            ) : (
              <Link to='/signin' />
            )}
            Submit
          </Button>
          {this.renderRedirect()}
          <Snackbar
            open={this.state.submitted}
            onClose={this.handleClose}
            TransitionComponent={this.state.Transition}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id='message-id'>{this.state.flash}</span>}
          />
          <Link to='/signup' className={classes.link}>
            Sign Up
          </Link>
        </form>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SignIn);
