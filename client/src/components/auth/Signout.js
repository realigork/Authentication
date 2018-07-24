import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import requireAuth from '../requireAuth';

class Signout extends Component {
  componentDidMount() {
    this.props.signout();
  }

  render() {
    return(
      <div>Sorry to see you go</div>
    );
  }
}

export default compose(
  connect(null, actions)
)(requireAuth(Signout));