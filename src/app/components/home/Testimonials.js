import React from 'react';
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Toolbar from 'material-ui/Toolbar';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import ToolbarSeparator from 'material-ui/Toolbar/ToolbarSeparator';
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle';
import Paper from 'material-ui/Paper';
import * as Colors from 'material-ui/styles/colors';
import testimonials from '../../data/testimonials'
import ListItemDivider from '../ui/ListItemDivider';

const path = "images/testimonials/";

module.exports = () => (
  <Paper>
    <Toolbar>
      <ToolbarGroup 
        style={{
          marginLeft:'auto',
          marginRight:'auto',
        }}
      >
        <ToolbarTitle text="Testimonials" />
      </ToolbarGroup>
    </Toolbar>

    <List className="list">
      {testimonials.map((item, index, arr) => (
        <div key={index}>
          <ListItem className="list-item"

            leftAvatar={
              <Avatar
                src={path + item.img}
                size={70}
              />
            }

            primaryText={
              <p className="testimonials-primary-text">
                  {item.text}
              </p>
            }

            secondaryText={
              <div className="secondary-text"
                style={{
                textAlign:'left',
                marginLeft:40,
              }}>
                <strong>{item.name}</strong>
                ,&nbsp;
                <span>{item.city}</span>
              </div>
            }
            secondaryTextLines={2}

            style={{border:'0px solid grey'}}
          />
          <ListItemDivider 
            index={index} 
            length={arr.length}
          />
        </div>
      ))}
    </List>
  </Paper>
);