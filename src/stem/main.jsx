/**
 * Main client file
 *
 * @flow
 */

require('react-tap-event-plugin')();

const React = require('react');
const App = require('./App.jsx').default;
const createStore = require('redux').createStore;
const Provider = require('react-redux').Provider;
const reducers = require('./reducers').default;

require('react-dom').render(
	<Provider store={createStore(reducers)}><App /></Provider>,
	document.getElementById('root')
);
