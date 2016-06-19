// import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
// import Chart from 'chart.js';
// import FlatButton from 'material-ui/FlatButton';
import Helmet from 'react-helmet';
import React from 'react';
import Firebase from 'firebase';

class Test extends React.Component {
	mixins: [ReactFireMixin]

	constructor(props) {
		super(props);
		this.state = {
			testProp: "Test Property State 1",
		};
	}

	componentWillMount() {
	  var ref = new Firebase("https://metromeduc.firebaseio.com/test");
	  this.bindAsArray(ref, "test");
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({testProp: "Test Property State 2"});
		}, 2000);
	}

	render() {
		return (
			<section>
				<Helmet title="Metromed Test Lab" />

				<h3>Firebase</h3>

				<h3>{this.state.testProp}</h3>
			</section>
		);
	}
}

export default Test;