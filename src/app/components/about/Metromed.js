// import ActionGrade from 'material-ui/svg-icons/action/grade';
// import ActionInfo from 'material-ui/svg-icons/action/info';
import Card from 'material-ui/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardHeader from 'material-ui/Card/CardHeader';
import CardMedia from 'material-ui/Card/CardMedia';
import CardText from 'material-ui/Card/CardText';
import CardTitle from 'material-ui/Card/CardTitle';
// import ContentDrafts from 'material-ui/svg-icons/content/drafts';
// import ContentInbox from 'material-ui/svg-icons/content/inbox';
// import ContentSend from 'material-ui/svg-icons/content/send';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';
import React from 'react';
import xRay from '../../images/about/x-ray-710x399.jpg';

export default React.createClass({
  render() {
    const { primaryColor, textColor } = this.props;
    return (
      <Card>
        <CardTitle title={<h3 style={{color:primaryColor}}>Why Metromed Urgent Care:</h3>}/>
        <CardMedia overlay={
          <CardTitle
            title="Our X-Ray imaging system"
            subtitle="We have laboratory and pharmacy as well"
          ></CardTitle>
        }>
          <img src={xRay} />
        </CardMedia>
        <CardText>
          <List>
            <ListItem disabled style={{textColor}}>Experienced emergency room docs and personnel</ListItem>
            <Divider/>
            <ListItem disabled style={{textColor}}>Bed-side Ultrasound Screening</ListItem>
            <Divider/>
            <ListItem disabled style={{textColor}}>X-Ray</ListItem>
            <Divider/>
            <ListItem disabled style={{textColor}}>Skillfully done procedures, such as:
              <div style={{maxWidth:350, marginLeft:'auto', marginRight:'auto'}}>
                <ul style={{textAlign:'left', lineHeight:1.4}}>
                  <li>Joint aspiration</li>
                  <li>Ingrown toenail removal</li>
                  <li>Foreign body removal from the eye</li>
                  <li>Reduction of fractures and dislocations</li>
                </ul>
              </div>
            </ListItem>
            <Divider/>
            <ListItem disabled style={{textColor}}>Laboratory and Pharmacy</ListItem>
            <Divider/>
            <ListItem disabled style={{textColor}}>IV treatment and EKG</ListItem>
            <Divider/>
            <ListItem disabled style={{textColor}}>Location. Yes, we are right next to Wal-Mart</ListItem>
            <Divider/>
            <ListItem disabled style={{textColor}}>Clean, Quick and Pleasant</ListItem>
          </List>
        </CardText>
      </Card>
    );
  }
});