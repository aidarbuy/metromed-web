import { Card, CardActions, CardHeader, CardMedia, CardText, CardTitle } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';
import React from 'react';

const items = [
  ["Experienced emergency room docs and personnel"],
  ["Bed-side Ultrasound Screening"],
  ["X-Ray"],
  ["Skillfully done procedures, such as:",
    [
      "Joint aspiration",
      "Ingrown toenail removal",
      "Foreign body removal from the eye",
      "Reduction of fractures and dislocations",
    ]
  ],
  ["Laboratory and Pharmacy"],
  ["IV treatment and EKG"],
  ["Location. Yes, we are right next to Wal-Mart"],
  ["Clean, Quick and Pleasant"],
];

export default ({ imgSubtitleColor, primaryColor, textColor }) => (
  <Card>
    <CardTitle title={
      <h3 style={{color:primaryColor}}>
        <span>About Metromed Urgent Care</span>
      </h3>
    }/>

    <CardMedia overlayContentStyle={{ bottom: -1 }} overlay={
      <CardTitle
        title = "Our X-Ray imaging system"
        subtitle = "We have laboratory and pharmacy as well."
        subtitleStyle = {{
          color: imgSubtitleColor,
        }}
      ></CardTitle>
    }>
      <img src={require('../../images/about/x-ray-710x399.jpg')} />
    </CardMedia>

    <CardText>
      <List>
        {items.map((item, i) => {
          if (i === 3) return (
            <div key={i}>
              <ListItem disabled style={{color:textColor}}>{item[0]}</ListItem>

              <div style={{
                padding: 0,
                maxWidth: 350,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: 20,
              }}>
                <ul style={{
                  margin: 0,
                  textAlign: 'left',
                  lineHeight: 1.6,
                  fontSize: 16,
                }}>
                  {item[1].map((subitem, i) => (
                    <li key={i}>{subitem}</li>
                  ))}
                </ul>
              </div>

              <Divider/>
            </div>
          );

          return (
            <div key={i}>
              <ListItem disabled style={{color:textColor}}>{item}</ListItem>
              <Divider/>
            </div>
          );
        })}
      </List>
    </CardText>
  </Card>
);