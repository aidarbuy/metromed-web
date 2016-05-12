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
import dataCustomServices   from '../../data/custom-services';

require('../../styles/layout.scss');

export default React.createClass({
  getIcon(i) {
    switch (i) {
      case 0: return <IconHeart styles={styles.icon} />;
      case 1: return <IconAidKit styles={styles.icon} />;
      case 2: return <IconImages styles={styles.icon} />;
      case 3: return <IconHistory styles={styles.icon} />;
    }
  },
  render() {
    const customServices = dataCustomServices.map((item, i) => {
      const icon = this.getIcon(i);
      return (
        <div className="flex-item" key={i}>
          <Card style={styles.card}>
            <CardMedia style={styles.cardMedia}>{icon}</CardMedia>
            <CardTitle style={styles.cardTitle}>{item.name}</CardTitle>
            <CardText style={styles.cardText}><p style={{margin:0, padding:0}} dangerouslySetInnerHTML={{__html: item.desc}} /></CardText>
            <CardActions><RaisedButton label={item.button} linkButton={true} href={item.href}/></CardActions>
          </Card>
        </div>
      );
    });
    return <div className="flex-container">{customServices}</div>;
  }
});

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
  icon : {
    color:cyan500,
    hover:pink500,
    display:'inline-block',
    width:70,
    height:70,
  }
};