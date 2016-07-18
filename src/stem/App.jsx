/**
 * Main application endpoint
 *
 * @flow
 */

import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import {connect} from 'react-redux';

const App = function() {
  return <MuiThemeProvider><AppBar /></MuiThemeProvider>;
};

exports.default = connect()(App);
