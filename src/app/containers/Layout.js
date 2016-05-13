import * as Colors from 'material-ui/styles/colors';
import AppBar from './AppBar';
import AppLeftNav from './AppLeftNav';
import AppTabs from './AppTabs';
import AppTabsIcon from './AppTabsIcon';
import AppFooter from '../components/layout/AppFooter';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';

require('../styles/layout.scss');

const muiTheme = getMuiTheme(baseTheme);

export default React.createClass({
  contextTypes: {
    store:    React.PropTypes.object,
    location: React.PropTypes.object,
    router:   React.PropTypes.object,
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },
  componentWillMount() {
    // let newMuiTheme = muiTheme;
    // const leftNav = { ...newMuiTheme.leftNav,
      // color: Colors.red700,
    // };
    // newMuiTheme.leftNav = leftNav;
    // overwrite this.state.muiTheme
    // this.setState({
      // muiTheme: newMuiTheme,
    // });
  },
  getInitialState() {
    const route = this.props.location.pathname;
    const index = this.getInitIndex(route);
    this.context.store.dispatch({type:"UPDATE_ROUTE", route});
    this.context.store.dispatch({type:"UPDATE_INDEX", index});
    const storeState = this.context.store.getState();
    return null;
  },
  getChildContext() {
    // state or propNames changed, update context of childs
    return {muiTheme}
  },
  getRouteName(index) {
    switch (index) {
      case 0  : return "/";
      case 1  : return "/about";
      case 2  : return "/services";
      case 3  : return "/doctors";
      case 4  : return "/articles";
      case 5  : return "/location";
      case 6  : return "/virtual";
      default : return "/";
    }
  },
  getInitIndex(pathname) {
    switch (pathname) {
      case "/doctors/roshelle-beckwith" : return 3;
      case "/doctors/matthew-beckwith"  : return 3;
      case "/doctors/patricia-micozzi"  : return 3;
      case "/doctors/brian-rader"       : return 3;
      case "/"          : return 0;
      case "/about"     : return 1;
      case "/services"  : return 2;
      case "/doctors"   : return 3;
      case "/doctors/2" : return 3;
      case "/doctors/3" : return 3;
      case "/doctors/4" : return 3;
      case "/articles"  : return 4;
      case "/location"  : return 5;
      case "/virtual"   : return 6;
      case "/gallery"   : return -1;
      case "/test"      : return -1;
      case "/visa"      : return -1;
      default           : return 1;
    }
  },
  pushToRouter(route) {
    this.context.router.push(route);
  },
  dispatchAction(action) {
    this.context.store.dispatch(action);
  },
  getStoreState() {
    return this.context.store.getState();
  },
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="layout">
          <AppBar 
            dispatchAction = {this.dispatchAction} 
            getStoreState  = {this.getStoreState}
          />
          <AppLeftNav 
            location={location}
            dispatchAction = {this.dispatchAction}
            getStoreState  = {this.getStoreState}
            getInitIndex   = {this.getInitIndex}
            pushToRouter   = {this.pushToRouter}
          />
          <AppTabs 
            location={location} 
            dispatchAction = {this.dispatchAction} 
            getInitIndex   = {this.getInitIndex}
            getStoreState  = {this.getStoreState}
            pushToRouter   = {this.pushToRouter}
            getRouteName   = {this.getRouteName}
          />
          <AppTabsIcon 
            location={location} 
            getInitIndex   = {this.getInitIndex}
            getRouteName   = {this.getRouteName}
          />
          {this.props.children}
          <AppFooter />
        </div>
      </MuiThemeProvider>
    )
  }
});