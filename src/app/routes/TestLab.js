import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Helmet from 'react-helmet';
// import { FormattedNumber, FormattedPlural } from 'react-intl';
import { default as React, Component, PropTypes } from 'react';

class TestLab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'Aidar',
			unreadCount: 1000,
		};
	}

	render() {
		const { name, unreadCount } = this.state;

		return (
			<section>
				<Helmet title="Metromed Test Lab" />

				<h3>Test Lab</h3>
				{/* .container is main centered wrapper */}
				<div class="container">

				  {/* columns should be the immediate child of a .row */}
				  <div class="row">
				    <div class="one column">One</div>
				    <div class="eleven columns">Eleven</div>
				  </div>

				  {/* just use a number and class 'column' or 'columns' */}
				  <div class="row">
				    <div class="two columns">Two</div>
				    <div class="ten columns">Ten</div>
				  </div>

				  {/* there are a few shorthand columns widths as well */}
				  <div class="row">
				    <div class="one-third column">1/3</div>
				    <div class="two-thirds column">2/3</div>
				  </div>
				  <div class="row">
				    <div class="one-half column">1/2</div>
				    <div class="one-half column">1/2</div>
				  </div>

				</div>

				{/* Note: columns can be nested, but it's not recommended since Skeleton's grid has %-based gutters, meaning a nested grid results in variable with gutters (which can end up being *really* small on certain browser/device sizes) */}
			</section>
		);
	}
}

export default TestLab;
