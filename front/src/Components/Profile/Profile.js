import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {
        email: 'homer.simpson@wildcodeschool.fr',
        name: 'Homer',
        lastname: 'Simpson',
      },
    };

    this.handleSignOut = this.handleSignOut.bind(this);
  }

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
      </React.Fragment>
    );
  }
}

export default Profile;
