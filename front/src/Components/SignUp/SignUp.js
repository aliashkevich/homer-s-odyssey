import React from 'react';

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
          <input
            type='email'
            name='email'
            onChange={this.updateInputField}
            placeholder='Email'
          />
          <input
            type='password'
            name='password'
            onChange={this.updateInputField}
            placeholder='Password'
          />
          <input
            type='password'
            name='passwordbis'
            onChange={this.updateInputField}
            placeholder='Confirm Password'
          />
          <input
            type='text'
            name='name'
            onChange={this.updateInputField}
            placeholder='First name'
          />
          <input
            type='text'
            name='lastname'
            onChange={this.updateInputField}
            placeholder='Last name'
          />
          <input type='submit' value='Submit' onClick={this.handleSubmit} />
        </form>
      </div>
    );
  }
}
