import Button from 'material-ui/FlatButton';
import doctors from '../data/doctors';
import DoctorsIcon from 'material-ui/svg-icons/navigation/arrow-back';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import React from 'react';

function getDoctor(id) {
	for (var i = doctors.length - 1; i >= 0; i--) {
		if (doctors[i].id == id) {
			return doctors[i];
		}
	}
}

class Doctor extends React.Component {
	constructor(props) {
		super(props);
		this.handleTouchTap = this.handleTouchTap.bind(this);
	}

	handleTouchTap() {
		const route = "/doctors", index = 3;
		// this.context.router.push(route);
		this.context.store.dispatch({type:"UPDATE_ROUTE", route});
		this.context.store.dispatch({type:"UPDATE_INDEX", index});
	}

	render() {
		const { primary1Color, primary3Color, textColor } = this.context.muiTheme.palette;
		const { id } = this.props.params;
		const doctor = getDoctor(id);

		return (
			<article>
				<Helmet
					title = {"Doctor " + doctor.firstname + " " + doctor.lastname}
				/>

				<div style={{textAlign:'left'}}>
					<Button className="button-top-left"
						label="All Doctors" 
						labelPosition="after"
						primary={true}
						icon={<DoctorsIcon />}
						linkButton={true}
						containerElement={<Link to="/doctors" />}
						onTouchTap={this.handleTouchTap}
					/>
				</div>

				<h3 style={{
					color: primary3Color,
					textTransform: 'capitalize'
				}}>
					Doctor {doctor.firstname} {doctor.lastname}
				</h3>

				<img width="100%" 
					src={require("../images/doctors/" + doctor.img.big)}
				/>

				<div style={{margin:50, color:textColor}}>
					{doctor.description.map((section, i) => (
						<p key={i} dangerouslySetInnerHTML={{__html: section}}/>
					))}
				</div>
			</article>
		)
	}
}

Doctor.contextTypes = {
	store:  React.PropTypes.object,
	router: React.PropTypes.object,
	muiTheme: React.PropTypes.object,
};

export default Doctor;