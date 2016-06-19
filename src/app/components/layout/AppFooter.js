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

class AppFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: false,
    };
  }

  handleToggle(toggled) {
    this.props.toggleTheme(toggled);
    this.setState({
      toggled: !this.state.toggled,
    });
  }

  render() {
    const {
      bgColor, shadowColor, textColor, thumbColor, trackColor
    } = this.props;

    const decomposed = decomposeColor(shadowColor);
    const rgb = decomposed.values;
    const shadowColorHex = rgbToHex(rgb[0], rgb[1], rgb[2]);

    const social = dataSocial.slice(0, 3);
    const socialMapped = social.map((icon, index) => (
      <a key={icon.name} href={icon.href}>
        <IconButton touch tooltip={icon.desc} tooltipPosition="top-right" style={{marginTop:4}}>
          <Icon iconName={icon.icon} styles={{boxShadow:'1px 1px 3px' + shadowColorHex}}/>
        </IconButton>
      </a>
    ));

    return (
      <Toolbar style={{marginTop:20}}>
        <ToolbarGroup float="left" firstChild={false}>
          {socialMapped}
        </ToolbarGroup>

        <ToolbarGroup>
          <Toggle toggled={this.state.toggled}
            thumbStyle={{background: thumbColor}}
            trackStyle={{background: trackColor}}
            onToggle={(e, toggled) => { this.handleToggle(toggled)} }
            style={{margin:'auto'}}
          />
        </ToolbarGroup>

        <ToolbarGroup float="right" lastChild={false}>
          <ToolbarTitle text="&copy; 2016 Amygdala LLC" style={{
            // color: textColor,
            fontSize: 16,
          }}/>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default AppFooter;