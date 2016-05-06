import React      from 'react';
import { Link }   from 'react-router';
import AppBar     from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import LeftIcon   from 'material-ui/svg-icons/navigation/menu';
import IconMenu   from 'material-ui/IconMenu';
import MoreIcon   from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem   from 'material-ui/MenuItem';

const titles = [
  "Metromed Urgent Care",
  "(703)-687-4158",
  "952 Edwards Ferry Rd NE, Leesburg, VA 20176",
  "info@metromeduc.com",
];

export default React.createClass({
  contextTypes: {
    store: React.PropTypes.object
  },
  getInitialState() {
    var storeState = this.props.getStoreState();
    return { 
      title: storeState.appBar.title,
    };
  },
  handleTouchTap() {
    this.props.dispatchAction({type:'TOGGLE_LEFTNAV'});
  },
  handleTitleTouchTap() {
    var storeState = this.props.getStoreState();
    var index = storeState.appBar.index;
    if (index > 3) index = 0;
    this.props.dispatchAction({
      type:"UPDATE_APPBARTITLE",
      title:titles[index],
      index:++index,
    });
    storeState = this.props.getStoreState();
    this.setState({ title: storeState.appBar.title });
  },
  render() {
    return (
      <AppBar 
        showMenuIconButton={true}
        iconElementLeft={
          <IconButton onTouchTap={this.handleTouchTap}>
            <LeftIcon />
          </IconButton>
        }

        title={this.state.title}
        titleStyle={{textAlign:'center'}}
        onTitleTouchTap={this.handleTitleTouchTap}

        iconElementRight={
          <IconMenu 
            iconButtonElement={<IconButton><MoreIcon /></IconButton>}
            targetOrigin={{horizontal:'right', vertical:'top'}}
            anchorOrigin={{horizontal:'right', vertical:'top'}}
          >
            <MenuItem 
              primaryText="Reload this page" 
              onTouchTap={()=>{location.reload()}}
            />
            {/*
            <MenuItem 
              primaryText="Telemedicine" 
              containerElement={<Link to="/telemed" />}
            />
            <MenuItem 
              primaryText="Visa 4 UK"
              containerElement={<Link to="/visa" />}
            />
            */}
          </IconMenu>
        }
      />
    )
  }
});