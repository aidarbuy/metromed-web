import React    from 'react';
import Helmet   from 'react-helmet';
import Paper    from 'material-ui/Paper';
import Welcome  from '../components/about/Welcome';
import Metromed from '../components/about/Metromed';

export default () => (
  <section>
    <Helmet title="About Us - Metromed UC"/>

    <div className="flex-container">
      <div className="flex-container-half">
        <Welcome/>
      </div>

      <div className="flex-container-half">
        <Metromed/>
      </div>
    </div>
  </section>
);