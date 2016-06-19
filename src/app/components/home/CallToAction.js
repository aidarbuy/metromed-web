import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';

export default ({ textColor, paperBgColor, buttonBgColor }) => (
  <Paper zDepth={2} style={{
    margin: '20px 0',
    padding: 20,
    minHeight: 200,
    background: paperBgColor,
    textAlign: 'center',
  }}>

    <h4 style={{margin:0, color:textColor}}>If You Feel Sick You Should Not Wait!</h4>

    <RaisedButton label="Call Us Now"
      href="tel:1-703-687-4158" 
      primary={true} linkButton={true}
      style={{margin:'20px 0', width:200}}
      backgroundColor={buttonBgColor} />

    <h5 style={{color:textColor}}>We are passionate about caring for your health and providing exceptional urgent care</h5>

  </Paper>
);