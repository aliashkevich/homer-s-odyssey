import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// const useStyles = makeStyles(theme => ({
//   button: {
//     margin: theme.spacing(1),
//   },
//   input: {
//     display: 'none',
//   },
// }));
// const classes = useStyles();

export default class SignUp extends React.Component {
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
    return (
      <div>
        <form>
          <h1>{JSON.stringify(this.state, 1, 1)}</h1>
          <TextField
            label='Email'
            type='email'
            name='email'
            autoComplete='email'
            margin='normal'
            onChange={this.updateInputField}
          />
          <TextField
            label='Password'
            type='password'
            autoComplete='current-password'
            margin='normal'
            onChange={this.updateInputField}
          />
          <TextField
            label='Confirm password'
            type='password'
            name='passwordbis'
            margin='normal'
            onChange={this.updateInputField}
          />
          <TextField
            label='First Name'
            autoComplete='name'
            margin='normal'
            type='text'
            name='name'
            onChange={this.updateInputField}
          />
          <TextField
            label='Last name'
            type='text'
            name='lastname'
            autoComplete='lastname'
            margin='normal'
            onChange={this.updateInputField}
          />
          <Button
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
