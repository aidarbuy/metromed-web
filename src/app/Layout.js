import AppBar from './components/layout/AppBar';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import Drawer from'./components/layout/Drawer';
import { fade } from 'material-ui/utils/colorManipulator';
import Footer from './components/layout/Footer';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import { Tab, Tabs } from 'material-ui/Tabs';
require('./styles/layout.scss');
require('./styles/typography.scss');

// Icons
import HomeIcon from 'material-ui/svg-icons/action/home';
import AboutIcon from 'material-ui/svg-icons/action/info';
import ServicesIcon from 'material-ui/svg-icons/maps/local-hospital';
import DoctorsIcon from 'material-ui/svg-icons/social/people';
import ArticlesIcon from 'material-ui/svg-icons/av/library-books';
import LocationIcon from 'material-ui/svg-icons/maps/place';
import VirtualIcon from 'material-ui/svg-icons/action/three-d-rotation';

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

const titles = [
  "Metromed Urgent Care",
  "(703)-687-4158",
  "952 Edwards Ferry Rd NE, Leesburg, VA 20176",
  "info@metromeduc.com",
];

const getMenuItems = (iconColor) => {
	return [{
		name: "Home",
		icon: <HomeIcon style={{fill:iconColor}} />,
		route: '/',
	},{
		name: "About Us",
		icon: <AboutIcon style={{fill:iconColor}} />,
		route: '/about',
	},{
		name: "Services",
		icon: <ServicesIcon style={{fill:iconColor}} />,
		route: '/services',
	},{
		name: "Doctors",
		icon: <DoctorsIcon style={{fill:iconColor}} />,
		route: '/doctors',
	},{
		name: "Articles",
		icon: <ArticlesIcon style={{fill:iconColor}} />,
		route: '/articles',
	},{
		name: "Location",
		icon: <LocationIcon style={{fill:iconColor}} />,
		route: '/location',
	},{
		name: "Virtual",
		icon: <VirtualIcon style={{fill:iconColor}} />,
		route: '/virtual',
	}];
};

function getRouteName(index) {
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
}

function getInitIndex(route) {
	switch (route) {
		case "/"          : return 0;
		case "/about"     : return 1;
		case "/services"  : return 2;
		case "/doctors"   : return 3;
		case "/doctors/roshelle-beckwith" : return 3;
		case "/doctors/matthew-beckwith"  : return 3;
		case "/doctors/patricia-micozzi"  : return 3;
		case "/doctors/brian-rader"       : return 3;
		case "/articles"  : return 4;
		case "/location"  : return 5;
		case "/virtual"   : return 6;
		default           : return -1;
	}
}

class Layout extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.pushToRouter = this.pushToRouter.bind(this);
		this.setTheme = this.setTheme.bind(this);
		this.setRoute = this.setRoute.bind(this);
		this.toggleDrawer = this.toggleDrawer.bind(this);
	}

	getChildContext() {
		// state or propNames changed, update context of childs
		return { muiTheme: this.state.muiTheme };
	}

	componentWillMount() {
		// console.debug(this.context.router.push);
		const pathname = this.props.location.pathname;
		const index = getInitIndex(pathname);
		const isThemeDark = localStorage.getItem('isThemeDark');
		const isThemeDarkBoolean = isThemeDark === "true" ? true : false;
		this.setState({
			isDrawerOpen: false,
			isThemeDark: isThemeDarkBoolean,
			route: pathname,
			tabIndex: index,
		});
		this.setTheme(isThemeDarkBoolean);
	}

	handleChange(value) {
		this.pushToRouter(value);
		this.setState({route:value});
	}

	setRoute(route) {
		this.pushToRouter(route);
		this.toggleDrawer();
		this.setState({route});
	}

	setTheme(isThemeDark) {
		if (isThemeDark) {
			this.setState({muiTheme: getMuiTheme(darkBaseTheme), isThemeDark: true});
			document.body.style.backgroundColor = darkBaseTheme.palette.canvasColor;
			localStorage.setItem('isThemeDark', 'true');
		} else {
			this.setState({muiTheme: getMuiTheme(lightBaseTheme), isThemeDark: false});
			document.body.style.backgroundColor = lightBaseTheme.palette.canvasColor;
			localStorage.setItem('isThemeDark', 'false');
		}
	}

	pushToRouter(route) {
		this.context.router.push(route);
	}

	toggleDrawer() {
		this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
	}

	render() {
		const { isDrawerOpen, muiTheme, route } = this.state;
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
						toggleDrawer   = { this.toggleDrawer }
					/>

					{/* Left navigation drawer, opens on click */}
					<Drawer
						setRoute   	  = { this.setRoute }
						emailColor 	  = { alternateTextColor }
						iconColor 	  = { accent1Color }
						isDrawerOpen  = { this.state.isDrawerOpen }
						menuItemColor = { primary2Color }
						menuItems 	  = { getMenuItems(accent1Color) }
						phoneColor 	  = { accent2Color }
						toggleDrawer  = { this.toggleDrawer }
					/>

					{/* Main tab navigation */}
					<Tabs
						className = "app-tabs-icon"
						value = { route }
						onChange={this.handleChange}
					>
						{getMenuItems().map((item, i) => (
							<Tab
								icon 	 = { item.icon }
								key 	 = { i }
								value 	 = { item.route }
							/>
						))}
					</Tabs>

					{/* Render all children here */}
					{ this.props.children }

					{/* Main footer with icons links to social pages */}
					<Footer
						bgColor 	= { accent2Color }
						isThemeDark = { this.state.isThemeDark }
						setTheme    = { this.setTheme }
						shadowColor = { shadowColor }
						textColor 	= { alternateTextColor }
						thumbColor 	= { primary1Color }
						trackColor 	= { canvasColor }
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