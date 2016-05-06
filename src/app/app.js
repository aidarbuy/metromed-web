import React from 'react';
import ReactDOM from 'react-dom';
import Routes  from './Routes';
import { createStore } from 'redux';
import reducer from './reducers/index';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap. Can go away on react 1.0
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// Providing store over context
Provider.childContextTypes = {
  store: React.PropTypes.object
};

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
ReactDOM.render(
  <Provider store={createStore(reducer)}>
    <Router history={browserHistory} onUpdate={()=> window.scrollTo(0, 0)}>
      {Routes}
    </Router>
  </Provider>, 
  document.getElementById('app')
);