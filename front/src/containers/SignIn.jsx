import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

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
        this.props.dispatch({
          type: 'CREATE_SESSION',
          user: res.data,
          token: res.token,
          message: res.flash,
        }),
      )
      .catch(err => console.log(err));
  };

  renderRedirect = () => {
    return <Redirect to={{pathname: '/profile'}} />;
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
            Submit
          </Button>
          <Link to='/signup' className={classes.link}>
            Sign Up
          </Link>
          {this.props.authenticated ? this.renderRedirect() : null}
        </form>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.auth.token,
  };
}

const reduxConnector = connect(
  mapStateToProps,
  null,
);

SignIn = withStyles(styles)(SignIn);
export default reduxConnector(SignIn);
