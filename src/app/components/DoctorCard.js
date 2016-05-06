import React       from 'react';
import { Link }    from 'react-router';
import Card        from 'material-ui/Card';
import CardMedia   from 'material-ui/Card/CardMedia';
import CardTitle   from 'material-ui/Card/CardTitle';
import CardText    from 'material-ui/Card/CardText';
import CardActions from 'material-ui/Card/CardActions';
import Button      from 'material-ui/RaisedButton';
import Icon        from 'material-ui/svg-icons/navigation/arrow-forward';

export default React.createClass({
  contextTypes: {
    store:  React.PropTypes.object,
  },
  render() {
    const { doc } = this.props;
    const fullName = doc.firstname + " " + doc.lastname;
    const route = "/doctors/" + doc.id;
    const { store } = this.context;
    return (
      <Card style={{
        /*margin: 5px;*/
        boxSizing:'border-box',
        minHeight:490,
        // border:'1px dashed red',
      }}>
        <CardMedia overlay={
          <CardTitle title={"Dr. " + fullName}/>}
          overlayContentStyle={{
            background:'rgba(0, 188, 212, 0.7)', 
            bottom:-1,
            margin:0,
            padding:0,
          }}
        >
          <img src={'images/doctors/' + doc.img.big}/>
        </CardMedia>

        <CardTitle className="doctor-card-title" 
          title={doc.speciality} subtitle={doc.title}/>

        <CardText className="doctor-card-text">{doc.description[0]}</CardText>

        <CardActions style={{textAlign:'right'}}>
          <Button label="Read more" 
            labelPosition="before" 
            tooltip={"Read about doctor " + fullName}
            icon={<Icon/>} 
            linkButton={true}
            secondary={true} 
            containerElement={<Link to={route} />}
            onTouchTap={() => {store.dispatch({type:"UPDATE_ROUTE", route})}}
          />
        </CardActions>
      </Card>
    );
  }
});