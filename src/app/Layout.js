import AppBar from './components/layout/AppBar';
import AppTabs from './components/layout/AppTabs';
import { darkBaseTheme, lightBaseTheme } from './data/colors';
import Drawer from'./components/layout/Drawer';
import { fade } from 'material-ui/utils/colorManipulator';
import Footer from './components/layout/Footer';
import { getInitIndex } from './tools/navigation';
import { getMenuItems } from './data/menu-items';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { getShadowHexColor } from './tools/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
require('./styles/layout.scss');
require('./styles/typography.scss');

class Layout extends React.Component {
	constructor(props) {
		super(props);
		this.handleActive = this.handleActive.bind(this);
		this.pushToRouter = this.pushToRouter.bind(this);
		this.toggleAppbarFixed = this.toggleAppbarFixed.bind(this);
		this.setRoute = this.setRoute.bind(this);
		this.setMainState = this.setMainState.bind(this);
		this.setTheme = this.setTheme.bind(this);
		this.toggleDrawer = this.toggleDrawer.bind(this);
	}

	componentWillMount() {
		const pathname = this.props.location.pathname;
		const initIndex = getInitIndex(pathname);
		const isAppbarFixed = localStorage.getItem('isAppbarFixed');
		const isThemeDark = localStorage.getItem('isThemeDark');
		const isThemeDarkBoolean = isThemeDark === "true" ? true : false;
		this.setState({
			isAppbarFixed: isAppbarFixed,
			isPopoverOpen: false,
			footerMenuValue: 3,
			initialSelectedIndex: initIndex,
			isDrawerOpen: false,
			isThemeDark: isThemeDarkBoolean,
			route: pathname,
			tabIndex: initIndex,
		});
		this.setTheme(isThemeDarkBoolean);
	}

	getChildContext() {
		// state or propNames changed, update context of childs
		return { muiTheme: this.state.muiTheme };
	}

	handleActive(tab) {
		const { value } = tab.props;
		this.pushToRouter(value);
		this.setState({route:value});
	}

	pushToRouter(route) {
		this.context.router.push(route);
	}

	setMainState(prop) {
		this.setState(prop);
	}

	setRoute(route) {
		this.pushToRouter(route);
		this.toggleDrawer();
		this.setState({route});
	}

	setTheme(isThemeDark) {
		const themeArr = isThemeDark ? [darkBaseTheme, true] : [lightBaseTheme, false];
		this.setState({ muiTheme: getMuiTheme(themeArr[0]), isThemeDark: themeArr[1] });
		document.body.style.backgroundColor = themeArr[0].palette.canvasColor;
		localStorage.setItem('isThemeDark', themeArr[1]);
	}

	toggleAppbarFixed() {
		this.setState({ isAppbarFixed: !this.state.isAppbarFixed });
		localStorage.setItem('isAppbarFixed', this.state.isAppbarFixed);
	}

	toggleDrawer() {
		this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
	}

	render() {
		const {
			isAppbarFixed,
			isDrawerOpen,
			initialSelectedIndex,
			isThemeDark,
			footerMenuValue,
			muiTheme,
			route
		} = this.state;

		const { 
			accent1Color, accent2Color, accent3Color, alternateTextColor,
			borderColor, canvasColor, pickerHeaderColor,
			primary1Color, primary2Color, primary3Color,
			textColor, shadowColor,
		} = muiTheme.palette;

		return (
			<MuiThemeProvider muiTheme = { muiTheme }>
				<div className = "layout">
					{/* Main Toolbar, can open AppLeftNav */}
					<AppBar
						isAppbarFixed  = { isAppbarFixed }
						isThemeDark 	 = { isThemeDark }
						setTheme 			 = { this.setTheme }
						toggleAppbarFixed = { this.toggleAppbarFixed }
						toggleDrawer   = { this.toggleDrawer }
						toggleTheme    = { this.toggleTheme }
					/>

					{/* Main tabs navigation */}
					<AppTabs
						bgColor = { primary1Color }
						handleActive = { this.handleActive }
						appbarPosition = "relative"
						isAppbarFixed = { isAppbarFixed }
						route = { route }
					/>

					{/* Render all children here */}
					{ this.props.children }

					{/* Left navigation drawer, opens on click */}
					<Drawer
						emailColor 	  = { alternateTextColor }
						isDrawerOpen  = { this.state.isDrawerOpen }
						menuItems 	  = { getMenuItems(primary2Color) }
						menuItemColor = { primary2Color }
						phoneColor 	  = { accent2Color }
						setRoute   	  = { this.setRoute }
						toggleDrawer  = { this.toggleDrawer }
					/>

					{/* Main footer with icons links to social pages */}
					<Footer
						bgColor 		  		= { accent2Color }
						footerMenuValue 	= { footerMenuValue }
						getShadowHexColor = { getShadowHexColor }
						isThemeDark 	  	= { isThemeDark }
						primary3Color 	  = { primary3Color }
						setMainState    	= { this.setMainState }
						setTheme    	  	= { this.setTheme }
						shadowColor 	  	= { shadowColor }
						textColor 		  	= { alternateTextColor }
						thumbColor 		  	= { primary1Color }
						trackColor 		  	= { canvasColor }
					/>
				</div>
			</MuiThemeProvider>
		)
	}
}

Layout.contextTypes = {
	location: React.PropTypes.object,
	router: React.PropTypes.object,
};

Layout.childContextTypes = {
	muiTheme: React.PropTypes.object,
};

export default Layout;