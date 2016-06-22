import { convertColorToString, decomposeColor } from 'material-ui/utils/colorManipulator';
import { cyan900 } from 'material-ui/styles/colors';
import dataSocial from '../../data/social';
import IconButton from 'material-ui/IconButton';
import IconFacebook from '../icons/IconFacebook';
import IconGoogle from '../icons/IconGooglePlus';
import IconInstagram from '../icons/IconInstagram';
import Toggle from 'material-ui/Toggle';
import Toolbar from 'material-ui/Toolbar';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle';
import React from 'react';

function componentToHex(c) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

const Icon = React.createClass({
	render() {
		switch (this.props.iconName) {
			case 'IconFacebook':
				return <IconFacebook styles={this.props.styles} />;
			case 'IconInstagram':
				return <IconInstagram styles={this.props.styles} />;
			case 'IconGoogle':
				return <IconGoogle styles={this.props.styles} />;
			default:
				return null;
		}
	}
});

function getShadowHexColor(shadowColor) {
	const decomposed = decomposeColor(shadowColor);
	const rgb = decomposed.values;
	return rgbToHex(rgb[0], rgb[1], rgb[2]);
}

const social = dataSocial.slice(0, 3);

export default ({ bgColor, setTheme, isThemeDark, shadowColor, textColor, thumbColor, trackColor }) => (
	<Toolbar style={{marginTop:20}}>
		<ToolbarGroup float="left" firstChild={false}>
			{social.map((icon, index) => (
				<a key={icon.name} href={icon.href}>
					<IconButton touch tooltip={icon.desc} tooltipPosition="top-right" style={{marginTop:4}}>
						<Icon iconName={icon.icon} styles={{boxShadow:'1px 1px 3px' + getShadowHexColor(shadowColor)}}/>
					</IconButton>
				</a>
			))}
		</ToolbarGroup>
		
		<ToolbarGroup>
			<Toggle name="TheToggle"
				onToggle   = {(e, toggled) => { setTheme(toggled) }}
				toggled    = { isThemeDark }
				style      = {{ margin:'auto' }}
				thumbStyle = {{ background: thumbColor }}
				trackStyle = {{ background: trackColor }}
			/>
		</ToolbarGroup>

		<ToolbarGroup float="right" lastChild={false}>
			<ToolbarTitle text="&copy; 2016 Amygdala LLC" style={{
				color: thumbColor,
				fontSize: 16,
			}}/>
		</ToolbarGroup>
	</Toolbar>
);