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
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Divider from 'material-ui/Divider';

module.exports = () => (
  <Card>
    <CardTitle title={<h3>
      Why MetroMed Urgent Care:
    </h3>}/>
    <CardMedia overlay={
      <CardTitle 
        title="Our X-Ray imaging system" 
        subtitle="We have laboratory and pharmacy as well" 
      ></CardTitle>
    }>
      <img src="images/gallery/x-ray.jpg" />
    </CardMedia>
    <CardText>
      <List>
        <ListItem className="why-metromed-list-item">
          Experienced emergency room docs and personnel
        </ListItem>
        <Divider/>
        <ListItem className="why-metromed-list-item">
          Bed-side Ultrasound Screening
        </ListItem>
        <Divider/>
        <ListItem className="why-metromed-list-item">
          X-Ray
        </ListItem>
        <Divider/>
        <ListItem className="why-metromed-list-item">
          Skillfully done procedures, such as:
          <div style={{
            maxWidth:350,
            marginLeft:'auto',
            marginRight:'auto',
          }}>
            <ul style={{
              textAlign:'left',
              lineHeight:1.4,
            }}>
              <li>Joint aspiration</li>
              <li>Ingrown toenail removal</li>
              <li>Foreign body removal from the eye</li><li>Reduction of fractures and dislocations</li>;
            </ul>
          </div>
        </ListItem>
        <Divider/>
        <ListItem className="why-metromed-list-item">
          Laboratory and Pharmacy
        </ListItem>
        <Divider/>
        <ListItem className="why-metromed-list-item">
          IV treatment and EKG
        </ListItem>
        <Divider/>
        <ListItem className="why-metromed-list-item">
          Location. Yes, we are right next to Wal-Mart
        </ListItem>
        <Divider/>
        <ListItem className="why-metromed-list-item">
          Clean, Quick and Pleasant
        </ListItem>
      </List>
    </CardText>
  </Card>
);