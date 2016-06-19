import Helmet from 'react-helmet';
import Metromed from '../components/about/Metromed';
import Paper from 'material-ui/Paper';
import React from 'react';
import Welcome from '../components/about/Welcome';

export default React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  render() {
    const { primary2Color, accent1Color, textColor } = this.context.muiTheme.palette;
    return (
      <section>
        <Helmet title="About Us - Metromed UC"/>

        <div className="flex-container">
          <div className="flex-container-half">
            <Welcome primaryColor={primary2Color} accentColor={accent1Color} textColor={textColor} />
          </div>

          <div className="flex-container-half">
            <Metromed primaryColor={primary2Color} accentColor={accent1Color} textColor={textColor} />
          </div>
        </div>
      </section>
    );
  }
});