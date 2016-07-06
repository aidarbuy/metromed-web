import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { createStore } from 'redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import reducer from './reducers/index';
import routes  from './Routes';
// import useScroll from 'react-router-scroll';

// Needed for onTouchTap. Can go away on react 1.0
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// Providing store over context
Provider.childContextTypes = {
	store: React.PropTypes.object
};

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
// ReactDOM.render(
// 	<IntlProvider locale="en-GB">
// 		<Provider store={createStore(reducer)}>
// 			<Router
// 				routes = { routes }
// 				history = { browserHistory }
// 				onUpdate = { ()=> window.scrollTo(0, 0) }
// 			/>
// 		</Provider>
// 	</IntlProvider>,
// 	document.getElementById('app')
// );

ReactDOM.render(
	<Provider store={createStore(reducer)}>
		<Router
			routes = { routes }
			history = { browserHistory }
			onUpdate = { ()=> window.scrollTo(0, 0) }
		/>
	</Provider>,
	document.getElementById('app')
);
