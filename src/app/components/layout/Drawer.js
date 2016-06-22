import AppBar from 'material-ui/AppBar';
import ArrowBackward from 'material-ui/svg-icons/navigation/arrow-back';
import { Card, CardActions, CardHeader, CardMedia, CardTitle } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import React from 'react';

export default ({ emailColor, iconColor, isDrawerOpen, menuItems, menuItemColor, phoneColor, setRoute, toggleDrawer }) => (
	<Drawer
		docked = { false }
		onRequestChange = { toggleDrawer }
		open = { isDrawerOpen }
		openSecondary = { false }
		width = { 200 }
	>
		<AppBar
			title = {
				<span style={{cursor:'pointer'}}>MetromedUC</span>
			}
			titleStyle = {{ fontSize: 20 }}
			onTitleTouchTap = { toggleDrawer }
			showMenuIconButton = { false }
			iconElementRight = {
				<IconButton onTouchTap = { toggleDrawer }>
					<ArrowBackward />
				</IconButton>
			}
		/>

		<Card style={{maxWidth:200}}>
			<CardMedia overlayContentStyle={{ bottom: -1 }} overlay={
				<CardTitle
					title = {
						<a href='tel:(703)-687-4158' style={{
							color: phoneColor,
							textDecoration: 'none',
						}}>
							<span>(703)-687-4158</span>
						</a>
					}

					subtitle = {
						<a href='mailto:info@metromeduc.com' style={{
							color: emailColor,
							textDecoration: 'none',
						}}>
							<span>info@metromeduc.com</span>
						</a>
					}
				/>
			}>
				<img src={require('../../images/gallery/three-medics-thumb.jpg')} />
			</CardMedia>
		</Card>

		{menuItems.map((item, i) => (
			<MenuItem key={i}
				innerDivStyle = {{ paddingLeft:60 }}
				leftIcon 	= { item.icon }
				onTouchTap 	= { () => { setRoute(item.route) } }
				primaryText = { item.name }
				style = {{ color:menuItemColor }}
				value = { item.route }
			/>
		))}
	</Drawer>
);