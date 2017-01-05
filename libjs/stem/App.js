/**
 * Main application endpoint
 *
 * @flow
 */

import React from 'react';
import {connect} from 'react-redux';

import actions from './actions';

class App extends React.Component {
  componentWillMount() {
    this.props.onLoad();
  }

  props: { onLoad: typeof actions.getNodes };

  render() {
    return null;
  }
};

export default connect(undefined, () => ({ onLoad: actions.getNodes }))(App);
