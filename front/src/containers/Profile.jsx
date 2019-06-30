import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {
        email: '',
        name: '',
        lastname: '',
      },
    };

    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    console.log('TOKEN: ' + this.props.token);
    fetch('/profile', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.props.token,
      }),
    })
      .then(res => res.json())
      .then(res =>
        this.setState({
          profile: {
            email: res.email,
            name: res.name,
            lastname: res.lastname,
          },
        }),
      )
      .catch(err => console.log(err));
  }

  handleSignOut() {
    this.props.dispatch({
      type: 'DELETE_SESSION',
    });
    this.props.history.push('/signin');
  }

  render() {
    return (
      <React.Fragment>
        <h1>Profile:</h1>
        <List>
          <ListItem>
            <ListItemText
              primary={this.state.profile.email}
              secondary='Email'
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={this.state.profile.name}
              secondary='First name'
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={this.state.profile.lastname}
              secondary='Last name'
            />
          </ListItem>
        </List>
        <Button
          variant='contained'
          color='primary'
          onClick={this.handleSignOut}>
          Sign Out
        </Button>
        <p>
          <Link to='/signin'>Sign In</Link>
        </p>
        <p>
          <Link to='/signup'>Sign Up</Link>
        </p>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user,
    token: state.auth.token,
  };
}

const reduxConnector = connect(
  mapStateToProps,
  null,
);

Profile = withRouter(Profile);
export default reduxConnector(Profile);
