import React 	from 'react';
import Helmet from 'react-helmet';
import GMaps 	from '../components/maps/GoogleMaps';

export default () => (
  <section>
    <Helmet title="Location - Metromed UC"/>

    <h3>Our location</h3>

    <GMaps/>
  </section>
);