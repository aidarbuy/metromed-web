import LeftNav from 'material-ui/Drawer';
import LeftNavCard from './LeftNavCard';
import LeftNavMenu from './LeftNavMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';

export default React.createClass({
  handleNavChange(event) {
    this.props.toggleLeftNav();
  },

  render() {
    return (
      <div>
        <LeftNav ref="leftNav"
          docked={false}
          width={200}
          open={this.props.openState}
          onRequestChange={this.handleNavChange}
        >

          <LeftNavCard />

          <LeftNavMenu 
            dispatchAction  = { this.props.dispatchAction }
            getInitIndex    = { this.props.getInitIndex }
            handleNavChange = { this.handleNavChange }
            iconColor       = { this.props.iconColor }
            location        = { this.props.location }
            pushToRouter    = { this.props.pushToRouter }
            textColor       = { this.props.textColor }
            toggleLeftNav   = { this.props.toggleLeftNav }
          />
        </LeftNav>
      </div>
    );
  }
});