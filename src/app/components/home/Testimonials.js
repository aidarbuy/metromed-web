import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';
import ListItemDivider from '../ui/ListItemDivider';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Paper from 'material-ui/Paper';
import React from 'react';
import testimonials from '../../data/testimonials'
import Toolbar from 'material-ui/Toolbar';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import ToolbarSeparator from 'material-ui/Toolbar/ToolbarSeparator';
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle';

const styles = {
  primaryText : {
    fontSize: 18,
    lineHeight: 1.4,
    textAlign: 'left',
    marginLeft: 40,
  },
};
export default React.createClass({
  render() {
    const { secondaryTextColor } = this.props;
    const testimonialsMap = testimonials.map((item, index, arr) => (
      <div key={index}>
        <ListItem className="list-item" disabled={true}
          leftAvatar={<Avatar src={require('../../images/testimonials/' + item.img)} size={70}/>}
          primaryText={<p style={styles.primaryText}>{item.text}</p>}
          secondaryText={
            <div style={{
              color: secondaryTextColor,
              textAlign: 'left',
              marginLeft: 40,
            }}>
              <strong>{item.name}</strong>,&nbsp;<span>{item.city}</span>
            </div>
          }
          secondaryTextLines={2}
          style={{border:'0px solid grey'}}
        />

        <ListItemDivider index={index} length={arr.length} />
      </div>
    ));
    return (
      <Paper>
        <Toolbar>
          <ToolbarGroup style={{marginLeft:'auto',marginRight:'auto'}}>
            <ToolbarTitle text="Testimonials" />
          </ToolbarGroup>
        </Toolbar>

        <List className="list">{testimonialsMap}</List>
      </Paper>
    );
  }
});