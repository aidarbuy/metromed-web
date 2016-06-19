import GMaps 	from '../components/maps/GoogleMaps';
import Helmet from 'react-helmet';
import Paper from 'material-ui/Paper';
import React  from 'react';

class Location extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { primary2Color, accent1Color } = this.context.muiTheme.palette;
    return (
      <section>
        <Helmet title="Location and Contacts - Metromed UC"/>

        <h3>Our location and contacts:</h3>

        <div style={{color:primary2Color}}>
          <h5>Address: 952 Edwards Ferry Rd NE, Leesburg, VA 20176</h5>
          <h5>Phone: (703)-687-4158</h5>
          <h5>Email: info@metromeduc.com</h5>
        </div>

        <Paper zDepth={2} style={{marginTop:20,padding:20}}><GMaps/></Paper>
      </section>
    );
  }
}

Location.contextTypes = {
  muiTheme: React.PropTypes.object,
};

export default Location;