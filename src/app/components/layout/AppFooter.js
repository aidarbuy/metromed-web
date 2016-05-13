import * as Colors from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import IconFacebook from '../icons/IconFacebook';
import IconGoogle from '../icons/IconGooglePlus';
import IconInstagram from '../icons/IconInstagram';
import dataSocial from '../../data/social';
import Toolbar from 'material-ui/Toolbar';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle';
import React from 'react';

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

export default React.createClass({
  render() {
    const social = dataSocial.slice(0, 3);
    const socialMapped = social.map((icon, index) => (
      <a key={icon.name} href={icon.href}>
        <IconButton touch tooltip={icon.desc} tooltipPosition="top-right" style={{marginTop:4}}>
          <Icon iconName={icon.icon} styles={{boxShadow:'1px 1px 3px' + Colors.cyan900}}/>
        </IconButton>
      </a>
    ));
    return (
      <Toolbar style={{background:Colors.cyan700}}>
        <ToolbarGroup float="left" firstChild={false}>
          {socialMapped}
        </ToolbarGroup>
        <ToolbarGroup float="right" lastChild={false}>
          <ToolbarTitle text="&copy; 2016 Amygdala LLC" style={{
            color:Colors.cyan50,
            fontSize:16,
          }}/>
        </ToolbarGroup>
      </Toolbar>
    );
  }
})
