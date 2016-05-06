import React from 'react';
import Card from 'material-ui/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardHeader from 'material-ui/Card/CardHeader';
import CardMedia from 'material-ui/Card/CardMedia';
import CardTitle from 'material-ui/Card/CardTitle';
import FlatButton from 'material-ui/FlatButton';
import CardText from 'material-ui/Card/CardText';
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';

import ListItemDivider from '../components/ui/ListItemDivider';

export default React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getKeys(muiTheme) {
    var keys = Object.keys(muiTheme).map((key, i, mui) => {
      var currentObject = muiTheme[key];
      if (key === "leftNav") console.log(currentObject);
      if (typeof currentObject === "object") {
        var props = this.getPropsFrom(currentObject);
        return (
          <div className="flex-item" key={key}>
            <Card style={{margin:10,minHeight:250}}>
              <CardTitle title={key}/>
              <CardText style={{textAlign:'left'}}>
                <List>
                  {props}
                </List>
              </CardText>
            </Card>
          </div>
        )
      }
    });
    return keys;
  },
  
  getPropsFrom(object) {
    var props = Object.keys(object).map((propName, i) => {
      return (
        <div key={propName}>
          <ListItem>
            {propName + ": " + object[propName]}
          </ListItem>
        </div>
      );
    });
    return props;
  },  

  render() {
    const muiTheme = this.context.muiTheme;
    var keys = this.getKeys(muiTheme);
    return (
      <div className="flex-container">{keys}</div>
    );
  }
});