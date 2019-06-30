import React, {Component} from 'react';
import {connect} from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';

class PopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flash: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({flash: nextProps.flash});
  }

  handleClose = () => {
    this.setState({flash: ''});
  };

  render() {
    return (
      <Snackbar
        open={this.state.flash !== ''}
        message={this.state.flash}
        autoHideDuration={2000}
        onClose={this.handleClose}
      />
    );
  }
}

function mapStateToProps(state) {
  return {flash: state.flash.message};
}

export default connect(mapStateToProps)(PopUp);
