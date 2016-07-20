/**
 * Main client file
 *
 * @flow
 */

import React from 'react';
import tapEventPlugin from 'react-tap-event-plugin';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';

import App from './App';
import reducers from './reducers';

// allow events in material-ui
tapEventPlugin();

ReactDOM.render(
  <Provider store={createStore(reducers)}><App /></Provider>,
  document.getElementById('root')
);
