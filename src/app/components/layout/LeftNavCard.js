import React from 'react';
import Card from 'material-ui/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardHeader from 'material-ui/Card/CardHeader';
import CardMedia from 'material-ui/Card/CardMedia';
import CardTitle from 'material-ui/Card/CardTitle';
import FlatButton from 'material-ui/FlatButton';
import CardText from 'material-ui/Card/CardText';
import Avatar from 'material-ui/Avatar';
import * as Colors from 'material-ui/styles/colors';
import threeMedicsThumb from '../../images/gallery/three-medics-thumb.jpg';

export default () => (
  <Card style={{maxWidth:200}}>
    <CardHeader
      title="MetroMed"
      subtitle="Urgent Care"
      avatar={
        <Avatar src={require("../../icons/logo.svg")}
          color={Colors.cyan500}
          backgroundColor={Colors.cyan500}
          style={{boxShadow:'1px 1px #0097A7'}}
        />
      }
    />
    <CardMedia
      overlayContentStyle={{
        // backgroundColor:'red',
        bottom: -1,
      }} 
      overlay={<CardTitle 
        title="(703)-687-4158" 
        subtitle='info@metromeduc.com' 
      />}>
      <img src={threeMedicsThumb} />
    </CardMedia>
  </Card>
);