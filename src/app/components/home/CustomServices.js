import Card from 'material-ui/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardHeader from 'material-ui/Card/CardHeader';
import CardMedia from 'material-ui/Card/CardMedia';
import CardText from 'material-ui/Card/CardText';
import CardTitle from 'material-ui/Card/CardTitle';
import dataCustomServices from '../../data/custom-services';
import IconAidKit from '../icons/IconAidKit';
import IconHeart from '../icons/IconHeart';
import IconHistory from '../icons/IconHistory';
import IconImages from '../icons/IconImages';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';

export default React.createClass({
  getInitialState() {
    return {
      styles: {
        color: this.props.iconColor,
        hover: this.props.hoverColor,
        display: 'inline-block',
        width: 70,
        height: 70,
      },
    };
  },

  getIcon(i) {
    const styles = this.state.styles;
    switch (i) {
      case 0: return <IconHeart styles={styles} />;
      case 1: return <IconAidKit styles={styles} />;
      case 2: return <IconImages styles={styles} />;
      case 3: return <IconHistory styles={styles} />;
    }
  },

  render() {
    const { iconColor, hoverColor, titleColor } = this.props;
    const customServices = dataCustomServices.map((item, i) => {
      const icon = this.getIcon(i, iconColor, hoverColor);

      return (
        <div className="flex-item" key={i}>
          <Card style={{
            padding: 20,
            paddingTop: 40,
            textAlign: 'center',
            minHeight: 380,
            marginTop: 'auto',
            marginBottom: 'auto',
          }}>

            <CardMedia>{icon}</CardMedia>

            <CardTitle
              title      = {item.name}
              titleColor = {titleColor}
              style      = {{margin:0, marginTop:10, padding:0}}
            />

            <CardText style={{
              margin: 0,
              padding: 0,
              marginTop: 20,
              marginBottom: 20,
              // border:'1px solid blue',
              fontSize: 16,
            }}>
              <p style={{margin:0, padding:0}}
                dangerouslySetInnerHTML={{__html: item.desc}}
              />
            </CardText>

            <CardActions>
              <RaisedButton 
                href       = { item.href }
                label      = { item.button }
                linkButton = { true }
                primary    = { false }
                secondary  = { true }
              />
            </CardActions>
          </Card>
        </div>
      );
    });

    return <div className="flex-container">{customServices}</div>;
  }
});