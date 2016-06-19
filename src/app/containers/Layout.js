import AppBar from '../components/layout/AppBar';
import AppFooter from '../components/layout/AppFooter';
import AppLeftNav from '../components/layout/AppLeftNav';
import AppTabs from './AppTabs';
import AppTabsIcon from './AppTabsIcon';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import { fade } from 'material-ui/utils/colorManipulator';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
require('../styles/layout.scss');
require('../styles/typography.scss');

import {
  blue500, blue700, blue900,
  grey100, grey200, grey700, grey800, grey900,
  lightGreen500, lightGreen700, lightGreenA400, lightGreenA700,
  deepOrange500,
  purple500, purple700, purple900, purpleA400, purpleA700,
  yellow500, yellow700, yellowA400,
} from 'material-ui/styles/colors';

// lightBaseTheme.palette.accent1Color = '#7cbc48';
// lightBaseTheme.palette.accent2Color = lightGreen500;
// lightBaseTheme.palette.accent3Color = pink700;
// lightBaseTheme.palette.textColor = 'yellow';

darkBaseTheme.palette.primary1Color = blue500;
darkBaseTheme.palette.primary2Color = blue700;
// darkBaseTheme.palette.primary3Color = green500;
darkBaseTheme.palette.accent1Color = purple500;
// darkBaseTheme.palette.accent2Color = grey800;
darkBaseTheme.palette.accent3Color = yellow500;
darkBaseTheme.palette.textColor = lightGreenA700;
darkBaseTheme.palette.alternateTextColor = grey200;

// const palette = {
//   primary1Color: cyan500 || cyan700,
//   primary2Color: cyan700 || cyan700,
//   primary3Color: grey400 || grey600,
//   accent1Color: pinkA200 || pinkA200,
//   accent2Color: grey100 || pinkA400,
//   accent3Color: grey500 || pinkA100,
//   textColor: darkBlack || fullWhite,
//   alternateTextColor: white || '#303030',
//   canvasColor: white || '#303030',
//   borderColor: grey300 || (0, fade)(fullWhite, 0.3),
//   disabledColor: (0, fade)(darkBlack, 0.3) || (0, fade)(fullWhite, 0.3),
//   pickerHeaderColor: cyan500 || (0, fade)(fullWhite, 0.12),
//   clockCircleColor: (0, fade)(darkBlack, 0.07) || (0, fade)(fullWhite, 0.12),
//   shadowColor: fullBlack || undefined
// };

export default React.createClass({
  contextTypes: {
    store:    React.PropTypes.object,
    location: React.PropTypes.object,
    router:   React.PropTypes.object,
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },
  getChildContext() {
    // state or propNames changed, update context of childs
    return { muiTheme: this.state.muiTheme };
  },

  getInitialState() {
    const route = this.props.location.pathname;
    const index = this.getInitIndex(route);
    this.context.store.dispatch({type:"UPDATE_ROUTE", route});
    this.context.store.dispatch({type:"UPDATE_INDEX", index});
    const storeState = this.context.store.getState();
    document.body.style.backgroundColor = lightBaseTheme.palette.canvasColor;
    return { 
      muiTheme: getMuiTheme(lightBaseTheme),
      leftNavOpenState: false,
      toggled: false,
    };
  },

  componentWillMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(()=> {
      const toggled = store.getState().appFooter.toggled;
      // if (toggled !== this.state.toggled) this.toggleTheme(toggled);
    });
  },
  componentWillUnmount() {
    this.unsubscribe();
  },

  toggleLeftNav() {
    console.log("Layout.toggleLeftNav()");
    this.setState({ leftNavOpenState: !this.state.leftNavOpenState });
  },
  toggleTheme(toggled) {
    // console.debug(toggled); // true || false
    const interval = 0;
    if (toggled) {
      this.setState({muiTheme: getMuiTheme(darkBaseTheme)}, () => {
        setTimeout(() => {
          document.body.style.backgroundColor = darkBaseTheme.palette.canvasColor;
        }, interval);
      });
    } else {
      this.setState({muiTheme: getMuiTheme(lightBaseTheme)}, () => {
        setTimeout(() => {
          document.body.style.backgroundColor = lightBaseTheme.palette.canvasColor;
        }, interval);
      });
    }
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
      default           : return -1;
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
    const { muiTheme, leftNavOpenState } = this.state;
    const { 
      accent1Color, accent2Color, accent3Color, alternateTextColor,
      borderColor, canvasColor, pickerHeaderColor,
      primary1Color, primary2Color, primary3Color, textColor, shadowColor,
    } = muiTheme.palette;

    return (
      <MuiThemeProvider muiTheme={ muiTheme }>
        <div className="layout">

          {/* Main Toolbar, can open AppLeftNav */}
          <AppBar 
            dispatchAction = { this.dispatchAction }
            getStoreState  = { this.getStoreState }
            toggleLeftNav  = { this.toggleLeftNav }
          />

          {/* Left navigation drawer, opens on click */}
          <AppLeftNav 
            openState      = { leftNavOpenState }
            location       = { location }
            dispatchAction = { this.dispatchAction }
            getStoreState  = { this.getStoreState }
            getInitIndex   = { this.getInitIndex }
            pushToRouter   = { this.pushToRouter }
            toggleLeftNav  = { this.toggleLeftNav }
            textColor      = { primary2Color }
            iconColor      = { primary1Color }
          />

          {/* Main tab navigation */}
          <AppTabs 
            location       = { location }
            dispatchAction = { this.dispatchAction }
            getInitIndex   = { this.getInitIndex }
            getStoreState  = { this.getStoreState }
            pushToRouter   = { this.pushToRouter }
            getRouteName   = { this.getRouteName }
          />

          {/* Main tab icons navigation */}
          <AppTabsIcon 
            location       = { location }
            getInitIndex   = { this.getInitIndex }
            getRouteName   = { this.getRouteName }
          />

          {/* Render all children here */}
          { this.props.children }

          {/* Main footer with icons links to social pages */}
          <AppFooter
            bgColor        = { accent2Color }
            dispatchAction = { this.dispatchAction }
            trackColor     = { canvasColor }
            thumbColor     = { primary1Color }
            shadowColor    = { shadowColor }
            textColor      = { alternateTextColor }
            toggleTheme    = { this.toggleTheme }
          />

        </div>
      </MuiThemeProvider>
    )
  }
});

// var Ticker = React.createClass({
//   mixins: [ReactPersistentState],
//   getInitialState: function () {
//     return { ticks: 0 };
//   },
//   componentDidMount: function () {
//     this.setPStorage(this.localStorage);
//     this.setPId('ticker');
//     this.restorePState();
//     var self = this;
//     setInterval(function () {
//       this.setPState({
//         ticks: this.state.ticks + 1
//       });
//     }, 1000);
//   },
//   render: function () {
//     return (
//       <span>{this.state.ticks}</span>
//     );
//   }
// });

