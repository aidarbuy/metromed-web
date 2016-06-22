import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import LeftIcon from 'material-ui/svg-icons/navigation/menu';
import { Link } from 'react-router';
import MenuItem from 'material-ui/MenuItem';
import MenuIcon from 'material-ui/svg-icons/navigation/expand-more';
import React from 'react';

export default ({ toggleDrawer }) => (
	<AppBar
		title = "Metromed Urgent Care" titleStyle={{textAlign:'center'}}
		showMenuIconButton={true}

		iconElementLeft={
			<IconButton onTouchTap={toggleDrawer}>
				<LeftIcon />
			</IconButton>
		}

		iconElementRight={
			<IconMenu
				iconButtonElement = { <IconButton><MenuIcon /></IconButton> }
				targetOrigin ={{ horizontal:'right', vertical:'top' }}
				anchorOrigin = {{horizontal:'right', vertical:'top' }}
			>
				<MenuItem 
					primaryText = "Reload this page" 
					onTouchTap = { ()=>{location.reload()} }
				/>

				<MenuItem 
					primaryText = "Telemed sevice"
					containerElement = { <Link to="/telemed" /> }
				/>
			</IconMenu>
		}
	/>
);