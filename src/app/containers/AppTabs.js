import React from 'react';
import Tabs  from 'material-ui/Tabs';
import Tab   from 'material-ui/Tabs/Tab';
import * as Colors from 'material-ui/styles/colors';

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
      <div style={{background:Colors.cyan500}}>
        <Tabs className="app-tabs"
          initialSelectedIndex={this.state.index}
          value={this.state.index}
          onChange={this.handleChange}
        >
          <Tab label="Home" 
            value={0}
            onActive={this.handleActive}
          />
          <Tab label="About Us" 
            value={1}
            onActive={this.handleActive}
          />
          <Tab label="Services" 
            value={2}
            onActive={this.handleActive} 
          />
          <Tab label="Doctors" 
            value={3}
            onActive={this.handleActive}
          />
          <Tab label="Articles" 
            value={4}
            onActive={this.handleActive}
          />
          <Tab label="Map" 
            value={5}
            onActive={this.handleActive}
          />
          <Tab label="Virtual Tour" 
            value={6}
            onActive={this.handleActive}
          />
        </Tabs>
      </div>
    )
  }
})