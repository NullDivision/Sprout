/**
 * Main client file
 *
 * @flow
 */

import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';

import App from './App';
import reducers from './reducers';

ReactDOM.render(
  <Provider store={createStore(reducers)}><App /></Provider>,
  document.getElementById('root')
);
