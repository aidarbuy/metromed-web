// src/app/reducers/index.js

import { combineReducers } from 'redux';

import appBar  from './appBar';
import appTabs from './appTabs';
import leftNav from './leftNav';
import router  from './router';

export default combineReducers({
  appBar,
  appTabs,
  leftNav,
  router,
});