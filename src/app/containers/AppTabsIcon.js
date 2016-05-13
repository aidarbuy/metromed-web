import AboutIcon from 'material-ui/svg-icons/action/info';
import DoctorsIcon from 'material-ui/svg-icons/social/people';
import FontIcon from 'material-ui/FontIcon';
import HomeIcon from 'material-ui/svg-icons/action/home';
import LibraryBooks from 'material-ui/svg-icons/av/library-books';
import MapIcon from 'material-ui/svg-icons/maps/place';
import React from 'react';
import ServicesIcon from 'material-ui/svg-icons/maps/local-hospital';
import Tab from 'material-ui/Tabs/Tab';
import Tabs from 'material-ui/Tabs';
import VirtualIcon from 'material-ui/svg-icons/action/three-d-rotation';

require('../styles/app-tabs.scss');

export default React.createClass({
  contextTypes: {
    store:  React.PropTypes.object,
    router: React.PropTypes.object,
  },
  getInitialState() {
    const { store } = this.context;
    const index = store.getState().appTabs.index;
    return { index };
  },
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => {
      var index = store.getState().appTabs.index;
      this.setState({ index });
    }).bind(this);
  },
  componentWillUnmount() {
    this.unsubscribe();
  },
  handleChange(index) {
    this.setState({ index });
    const route = this.props.getRouteName(index);
    this.context.router.push(route);
    this.context.store.dispatch({type:"UPDATE_INDEX", index});
    this.context.store.dispatch({type:"UPDATE_ROUTE", route});
  },
  render() {
    return (
      <Tabs className="app-tabs-icon"
        initialSelectedIndex={this.state.index}
        value={this.state.index}
        onChange={this.handleChange}
      >
        <Tab value={0} icon={<HomeIcon/>}/>
        <Tab value={1} icon={<AboutIcon/>}/>
        <Tab value={2} icon={<ServicesIcon/>}/>
        <Tab value={3} icon={<DoctorsIcon/>}/>
        <Tab value={4} icon={<LibraryBooks/>}/>
        <Tab value={5} icon={<MapIcon/>}/>
        <Tab value={6} icon={<VirtualIcon/>}/>
      </Tabs>
    )
  }
});