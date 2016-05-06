import React, { Component } from 'react';
import LeftNav      from 'material-ui/Drawer';
import MenuItem     from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import LeftNavCard  from '../components/layout/LeftNavCard';
import LeftNavMenu  from '../components/layout/LeftNavMenu';

export default React.createClass({
  contextTypes: {
    store: React.PropTypes.object
  },
  getInitialState() {
    const storeState = this.props.getStoreState();
    return {
      open: storeState.leftNav.open,
      // open: true,
    };
  },
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(()=> {
      this.setState({ 
        open: store.getState().leftNav.open 
      });
    });
  },
  componentWillUnmount() {
    this.unsubscribe();
  },
  handleNavChange(event) {
    this.props.dispatchAction({type:"TOGGLE_LEFTNAV"});
  },
  render() {
    return (
      <div>
        <LeftNav ref="leftNav"
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={this.handleNavChange}
        >
          <LeftNavCard/>
          <LeftNavMenu 
            handleNavChange = {this.handleNavChange}
            location        = {this.props.location}
            getInitIndex    = {this.props.getInitIndex}
            pushToRouter    = {this.props.pushToRouter}
            getStoreState   = {this.props.getStoreState}
            dispatchAction  = {this.props.dispatchAction}
          />
        </LeftNav>
      </div>
    );
  }
});