import React       from 'react';
import Card        from 'material-ui/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardHeader  from 'material-ui/Card/CardHeader';
import CardMedia   from 'material-ui/Card/CardMedia';
import CardTitle   from 'material-ui/Card/CardTitle';
import FlatButton  from 'material-ui/FlatButton';
import CardText    from 'material-ui/Card/CardText';
import Divider     from 'material-ui/Divider';
import Hours       from './HoursOfOperation';
import * as Colors from 'material-ui/styles/colors';

require('../../styles/layout.scss');
require('../../styles/top-bar.scss');

const styles = {
  CardTitle: {
    fontWeight: 400,
    paddingBottom: 0,
    color: Colors.white,
  },
  link: {
    color: Colors.white,
    textDecoration: 'none',
  },
  CardText : {
    fontSize: 19,
    fontWeight: 400,
    lineHeight: 1.4,
    verticalAlign: 'middle',
    display: 'inline-block',
    color: 'white',
  },
};

export default () => (
  <div className="flex-container">
    <div className="flex-item">
      <Card className="cell" style={{background:Colors.cyan400}}>
        <CardTitle title="Contact Info" titleColor="white" style={styles.CardTitle}/>
        <CardText style={styles.CardText}>
          <p><a href="tel:7036874158" style={styles.link}>(703) 687-4158</a></p>
          <p><a href="/location" style={styles.link}>952 Edwards Ferry Rd NE</a><br/><a href="/location" style={styles.link}>Leesburg, VA 20176</a></p>
          <p><a href="mailto:info@metromeduc.com" style={styles.link}>info@metromeduc.com</a></p>
        </CardText>
      </Card>
    </div>
    <div className="flex-item">
      <Card className="cell" style={{background:Colors.cyan500}}>
        <CardTitle title="Hours of Operation" titleColor="white" style={styles.CardTitle}/>
        <CardText style={styles.CardText}>
          <Hours />
        </CardText>
      </Card>
    </div>
    <div className="flex-item">
      <Card className="cell" style={{background:Colors.cyan500}}>
        <CardTitle title="Urgent Care" titleColor="white" style={styles.CardTitle} />
        <CardText style={styles.CardText}>
          <p>Our Emergency Medicine doctors can diagnose and treat a wide variety of illnessess and injuries.</p>
        </CardText>
      </Card>
    </div>
    <div className="flex-item">
      <Card className="cell" style={{background:Colors.cyan400}}>
        <CardTitle title="Holidays" titleColor="white" style={styles.CardTitle}/>
        <CardText style={styles.CardText}>
          <p>Major Holidays Observed</p>
          <Divider />
          <p>We are closed Monday May 30th</p>
        </CardText>
      </Card>
    </div>
  </div>
);
          // <p>No Appointments Necessary</p>