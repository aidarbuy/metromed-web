import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Helmet from 'react-helmet';
import { FormattedNumber, FormattedPlural } from 'react-intl';
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

				<p style={{color:'red'}}>
					<FormattedNumber value={unreadCount} />
					{' '}
					<FormattedPlural value={unreadCount} one="message" other="messages" />.
				</p>
			</section>
		);
	}
}

export default TestLab;
