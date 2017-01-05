/**
 * Stem package actions
 *
 * @flow
 */

import store from './store';
import TYPES from './actionRegistry';

function getNodes() {
  fetch('/api/v1/nodes').then(r => r.json()).then(d => {
    store.dispatch({ type: TYPES.GET_NODES });
  });
}

export default { getNodes };
