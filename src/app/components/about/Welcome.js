import React       from 'react';
import Card        from 'material-ui/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardHeader  from 'material-ui/Card/CardHeader';
import CardMedia   from 'material-ui/Card/CardMedia';
import CardTitle   from 'material-ui/Card/CardTitle';
import FlatButton  from 'material-ui/FlatButton';
import CardText    from 'material-ui/Card/CardText';
import Conditions  from './Conditions';

module.exports = () => (
  <Card>
    <CardTitle 
      title={<h4 className="secondary">Welcome to MetroMed!</h4>}
      subtitle={<h5>952 Edwards Ferry Rd NE, Leesburg, VA 20176</h5>}
    />

    <CardMedia overlay={
      <CardTitle 
        title="Matt, Doreen and Karl" 
        subtitle="members of our team">
      </CardTitle>
    }>
      <img src="images/team/three-medics.jpg" />
    </CardMedia>

    <CardText style={{textAlign:'left'}}>
      <h5>
        At MetroMed Urgent Care we treat 
        patients of all ages, with a 
        variety of conditions:
      </h5>

      <Conditions/>

      <div style={{marginTop:20}}>
        <em >
          * If you feel that you need to be 
          admitted to the hospital then it is 
          time to go to emergency room.
        </em>
      </div>
    </CardText>
  </Card>
);