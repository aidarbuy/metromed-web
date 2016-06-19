import Card        from 'material-ui/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardHeader  from 'material-ui/Card/CardHeader';
import CardMedia   from 'material-ui/Card/CardMedia';
import CardText    from 'material-ui/Card/CardText';
import CardTitle   from 'material-ui/Card/CardTitle';
import Conditions  from './Conditions';
import FlatButton  from 'material-ui/FlatButton';
import React       from 'react';
import threeMedics from '../../images/team/three-medics.jpg';

export default React.createClass({
  render() {
    const { primaryColor, accentColor, textColor } = this.props;

    return (
      <Card>
        <CardTitle 
          title={<h4 style={{color: accentColor}}>Welcome to MetroMed!</h4>}
          subtitle={<h5>952 Edwards Ferry Rd NE, Leesburg, VA 20176</h5>}
        />

        <CardMedia overlay={<CardTitle title="Matt, Doreen and Karl" subtitle="members of our team"></CardTitle>}>
          <img src={threeMedics} style={{marginBottom:1}} />
        </CardMedia>

        <CardText style={{textAlign:'left'}}>
          <h5>At MetroMed Urgent Care we treat patients of all ages, with a variety of conditions:</h5>

          <Conditions/>

          <div style={{marginTop:20}}>
            <em style={{color: accentColor}}>* If you feel that you need to be admitted to the hospital then it is time to go to emergency room.</em>
          </div>
        </CardText>
      </Card>
    );
  }
});