import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

import Button from 'material-ui/FlatButton';
import DoctorsIcon from 'material-ui/svg-icons/navigation/arrow-back';
import * as Colors from 'material-ui/styles/colors';

import doctors from '../data/doctors';

const styles = {
  header : {
    textTransform:'capitalize',
  },
};

function getDoctor(id) {
  for (var i = doctors.length - 1; i >= 0; i--) {
    if (doctors[i].id == id) {
      return doctors[i];
    }
  }
}

export default React.createClass({
  contextTypes: {
    store:  React.PropTypes.object,
    router: React.PropTypes.object,
  },
  handleTouchTap() {
    const route = "/doctors", index = 3;
    // this.context.router.push(route);
    this.context.store.dispatch({type:"UPDATE_ROUTE", route});
    this.context.store.dispatch({type:"UPDATE_INDEX", index});
  },
  render() {
    const { id } = this.props.params;
    const doctor = getDoctor(id);
    const src = "/images/doctors/" + doctor.img.big;
    const description = doctor.description.map((p, i) => (
      <div key={i} className="doctor-text"
      	dangerouslySetInnerHTML={{__html:p}}/>
    ));
    return (
      <article>
        <Helmet 
          title={"Doctor " + doctor.firstname + " " + doctor.lastname} 
        />
        <div style={{textAlign:'left'}}>
          <Button className="button-top-left"
            label="All Doctors" 
            labelPosition="after"
            primary={true}
            icon={<DoctorsIcon />}
            linkButton={true}
            rippleColor={Colors.pink500}
            containerElement={<Link to="/doctors" />}
            onTouchTap={this.handleTouchTap}
          />
        </div>

        <h4 style={styles.header}>
          Doctor {doctor.firstname} {doctor.lastname}
        </h4>

        <img width="100%" src={src}/>
        {description}
      </article>
    )
  }
});
