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

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      passwordbis: '',
      name: '',
      lastname: '',
      flash: '',
      submitted: false,
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
    const payload = {
      email: this.state.email,
      password: this.state.password,
      passwordbis: this.state.passwordbis,
      name: this.state.name,
      lastname: this.state.lastname,
      signedUp: false,
    };
    fetch('/auth/signup', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(
        res =>
          this.setState({
            flash: res.flash,
            submitted: true,
            Transition,
            signedUp: true,
          }),
        err =>
          this.setState({
            flash: err.flash,
            submitted: true,
            Transition,
            signedUp: false,
          }),
      );
  };

  handleClose = () => {
    this.setState({submitted: false});
  };

  renderRedirect = () => {
    if (this.state.signedUp) {
      return <Redirect to='/' />;
    }
  };

  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
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
          <TextField
            className={classes.textField}
            label='Confirm password'
            type='password'
            name='passwordbis'
            margin='normal'
            onChange={this.updateInputField}
            value={this.state.passwordbis}
          />
          <TextField
            className={classes.textField}
            label='First Name'
            autoComplete='name'
            margin='normal'
            type='text'
            name='name'
            onChange={this.updateInputField}
            value={this.state.name}
          />
          <TextField
            className={classes.textField}
            label='Last name'
            type='text'
            name='lastname'
            autoComplete='lastname'
            margin='normal'
            onChange={this.updateInputField}
            value={this.state.lastname}
          />
          <Button
            className={classes.button}
            variant='contained'
            color='primary'
            onClick={this.handleSubmit(TransitionUp)}>
            Submit
          </Button>
          {/* {this.renderRedirect()} */}
          <Snackbar
            open={this.state.submitted}
            onClose={this.handleClose}
            TransitionComponent={this.state.Transition}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id='message-id'>{this.state.flash}</span>}
          />
          <Link to='/signin' className={classes.link}>
            Sign In
          </Link>
        </form>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SignUp);
