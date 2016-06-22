// import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
// import Chart from 'chart.js';
// import FlatButton from 'material-ui/FlatButton';
import Helmet from 'react-helmet';
import React from 'react';

class Test extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			seconds: 0,
		};
	}

	componentWillMount() {
		// var ref = new Firebase("https://metromeduc.firebaseio.com/test");
		// this.bindAsArray(ref, "test");
	}

	componentDidMount() {
		setInterval(() => {
			this.setState({counter: this.state.seconds++});
		}, 1000);
	}

	render() {
		return (
			<section>
				<Helmet title="Metromed Test Lab" />

				<h3>Firebase</h3>

				<h3>{this.state.seconds}</h3>
			</section>
		);
	}
}

export default Test;