import React        from 'react';
import Card         from 'material-ui/Card';
import CardActions  from 'material-ui/Card/CardActions';
import CardHeader   from 'material-ui/Card/CardHeader';
import CardMedia    from 'material-ui/Card/CardMedia';
import CardTitle    from 'material-ui/Card/CardTitle';
import RaisedButton from 'material-ui/RaisedButton';
import CardText     from 'material-ui/Card/CardText';
import IconHeart    from '../icons/IconHeart';
import IconAidKit   from '../icons/IconAidKit';
import IconImages   from '../icons/IconImages';
import IconHistory  from '../icons/IconHistory';
import { cyan500, pink500 } from 'material-ui/styles/colors';

const styles = {
  card : {
    padding:20,
    paddingTop:40,
    textAlign:'center',
    minHeight:380,
    marginTop:'auto',
    marginBottom:'auto',
  },
  cardMedia : {
    // border:'1px solid red',
  },
  cardTitle : {
    margin:0,
    marginTop:10,
    padding:0,
    // border:'1px solid green',
  },
  cardText : {
    margin:0,
    padding:0,
    marginTop:20,
    marginBottom:20,
    // border:'1px solid blue',
    fontSize:16,
  },
  p : {
    margin:0,
    padding:0,
    // background:'yellow',
  },
  cardActions : {
    // border:'1px solid orange',
  },
  icon : {
    color:cyan500,
    hover:pink500,
    display:'inline-block',
    width:70,
    height:70,
  }
};

export default () => (
  <div className="flex-container">
    <div className="flex-item">
      <Card style={styles.card}>
        <CardMedia style={styles.cardMedia}>
          <IconHeart styles={styles.icon}/>
        </CardMedia>
        <CardTitle style={styles.cardTitle}>
          <span>Cardio Health</span>
        </CardTitle>
        <CardText style={styles.cardText}>
          <p style={styles.p}>Our clinic is equipped with <strong>EKG</strong>, <strong>X-ray</strong> and <strong>Laboratory</strong>.</p>
        </CardText>
        <CardActions style={styles.cardActions}>
          <RaisedButton label="About our clinic" linkButton={true} href="/about"/>
        </CardActions>
      </Card>
    </div>
    <div className="flex-item">
      <Card style={styles.card}>
        <CardMedia style={styles.cardMedia}>
          <IconAidKit styles={styles.icon}/>
        </CardMedia>
        <CardTitle style={styles.cardTitle}>
          <span>Medical Treatment</span>
        </CardTitle>
        <CardText style={styles.cardText}>
          <p style={styles.p}>We administer <strong>breathing treatments</strong>, repair <strong>lacerations</strong>, dispense <strong>medications</strong> intravenously, remove <strong>foreign objects</strong> from the eyes, and more.</p>
        </CardText>
        <CardActions style={styles.cardActions}>
          <RaisedButton label="Check our services" linkButton={true} href="/services"/>
        </CardActions>
      </Card>
    </div>
    <div className="flex-item">
      <Card style={styles.card}>
        <CardMedia style={styles.cardMedia}>
          <IconImages styles={styles.icon}/>
        </CardMedia>
        <CardTitle style={styles.cardTitle}>
          <span>Photo Gallery</span>
        </CardTitle>
        <CardText style={styles.cardText}>
          <p style={styles.p}>Check out our pictures!</p>
        </CardText>
        <CardActions style={styles.cardActions}>
          <RaisedButton label="View photo gallery" linkButton={true} href="/gallery"/>
        </CardActions>
      </Card>
    </div>
    <div className="flex-item">
      <Card style={styles.card}>
        <CardMedia style={styles.cardMedia}>
          <IconHistory styles={styles.icon}/>
        </CardMedia>
        <CardTitle style={styles.cardTitle}>
          <span>Anti-aging Institute</span>
        </CardTitle>
        <CardText style={styles.cardText}>
          <p style={styles.p}>We organize regular meetings with clients who want to be healthy, youthful and energetic.</p>
        </CardText>
        <CardActions style={styles.cardActions}>
          <RaisedButton label="Visit cognitivemuse.com" linkButton={true} href="http://www.cognitivemuse.com"/>
        </CardActions>
      </Card>
    </div>
  </div>
);