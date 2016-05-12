import Card from 'material-ui/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardHeader from 'material-ui/Card/CardHeader';
import CardMedia from 'material-ui/Card/CardMedia';
import CardText from 'material-ui/Card/CardText';
import CardTitle from 'material-ui/Card/CardTitle';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import ReadMoreIcon  from 'material-ui/svg-icons/action/description';
import React from 'react';

export default React.createClass({
  render() {
    const { props } = this;
    const img = props.img;
    const src = require("../../images/articles/" + img + "-600x300.jpg");

    return (
      <Card style={{minHeight:400}}>
        <CardMedia overlay={<CardTitle title={props.title} subtitle={props.subtitle}/>}>
          <img src={src} />
        </CardMedia>

        <CardText 
          style={{fontSize:16, textAlign:'left'}}
          dangerouslySetInnerHTML={{__html:props.teaser}}
        />

        <CardActions style={{textAlign:'right'}}>
          <RaisedButton 
            label="Read more" 
            labelPosition="before"
            primary={false}
            secondary={true}
            icon={<ReadMoreIcon />}
            style={{margin:12}}
            linkButton={true}
            href={"/articles/" + props.img}
          />
        </CardActions>
      </Card>
    )
  }
});