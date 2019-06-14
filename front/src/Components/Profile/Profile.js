import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import {withRouter} from 'react-router-dom';
import {Redirect} from 'react-router-dom';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      token: '',
      profile: {
        email: '',
        name: '',
        lastname: '',
      },
    };

    this.loadProfile = this.loadProfile.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    var token = '';

    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.token
    ) {
      token = this.props.location.state.token;
    }

    this.setState(
      {
        token: token,
      },
      this.loadProfile,
    );
  }

  loadProfile() {
    fetch('/profile', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.state.token,
      }),
    })
      .then(res => res.json())
      .then(res =>
        this.setState({
          loading: false,
          profile: {
            email: res.email,
            name: res.name,
            lastname: res.lastname,
          },
        }),
      )
      .catch(err =>
        this.setState({
          token: '',
          loading: false,
        }),
      );
  }

  renderRedirect = () => {
    if (this.state.token === '' && !this.state.loading) {
      return <Redirect to='/signin' />;
    }
  };

  handleSignOut() {
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
              secondary='my email'
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={this.state.profile.name}
              secondary='my first name'
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={this.state.profile.lastname}
              secondary='my last name'
            />
          </ListItem>
        </List>
        <Button
          variant='contained'
          color='primary'
          onClick={this.handleSignOut}>
          Sign Out
        </Button>
        {this.renderRedirect()}
      </React.Fragment>
    );
  }
}

export default withRouter(Profile);
