import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
    };

    this.updateInputField = this.updateInputField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateInputField(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    fetch('/auth/signup', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(this.state),
    })
      .then(res => res.json())
      .then(
        res => this.setState({flash: res.flash}),
        err => this.setState({flash: err.flash}),
      );

    console.log(this.state);
  }

  render() {
    const {classes} = this.props;
    return (
      <div>
        <form className={classes.container}>
          <h1>Sign Up!</h1>
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
            onClick={this.handleSubmit}>
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(SignUp);
