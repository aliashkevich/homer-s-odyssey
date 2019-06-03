import React from 'react';

export default class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: 'mon@email.com',
      password: 'monPassw0rd',
      passwordbis: 'monPassw0rd',
      name: 'James',
      lastname: 'Bond',
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
            name='fname'
            onChange={this.updateInputField}
            placeholder='First name'
          />
          <input
            type='text'
            name='lname'
            onChange={this.updateInputField}
            placeholder='Last name'
          />
          <input type='submit' value='Submit' onClick={this.handleSubmit} />
        </form>
      </div>
    );
  }
}
