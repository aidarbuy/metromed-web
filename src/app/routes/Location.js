import { Card, CardActions, CardHeader, CardMedia, CardText, CardTitle } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import GMaps from '../components/maps/GoogleMaps';
import Helmet from 'react-helmet';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import { storage } from '../data/firebase';
import PhonelinkRing from 'material-ui/svg-icons/communication/phonelink-ring';
import MapsPlace from 'material-ui/svg-icons/maps/place';

class Location extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { primary2Color, primary3Color, accent1Color } = this.context.muiTheme.palette;
		const address = "952 Edwards Ferry Rd NE";
		const city = "Leesburg, VA 20176";
		const location = "http://maps.google.com/?q=952 Edwards Ferry Road NE, Leesburg, Virginia, 20176";
		const leesburg = "http://maps.google.com/?q=Leesburg, Virginia, 20176";
		const phone = "(703)-687-4158";
		const email = "info@metromeduc.com";
		const loungeSrc = 'https://firebasestorage.googleapis.com/v0/b/metromeduc.appspot.com/o/images%2Finterior%2Flounge-1200x600.jpg?alt=media&token=7d9226dc-645f-47bf-801d-2a2ecf875294';
		const text = "Clean and pleasant place";
		const text2 = "We are right next to Wal-Mart.";
		const title = "Our Contacts and Location";

		return (
			<section>
				<Helmet title="Contacts and Location - Metromed UC"/>

				<h3 style={{color:primary3Color}}>{title}</h3>

				<div className="flex-container" style={{marginTop:-30}}>
					<div className="flex-item-half">
						<Card>
							<CardHeader
								title = {
									<a
										href = { "tel:" + phone }
										style = {{ 
											color: accent1Color,
											fontSize: 18,
									}}>{phone}</a>
								}

								subtitle = {
									<a
										href = { "mailto:" + email }
										style = {{ 
											color: primary2Color,
											fontSize: 16,
									}}>{email}</a>
								}

								avatar = {
									<PhonelinkRing style = {{
										fill: primary3Color,
										marginTop: 12,
										marginLeft: 10,
									}}/>
								}
							/>

							<CardMedia
								overlay={
									<CardTitle
										title = { text }
										subtitle = { text2 }
									/>
								}
							>
								<img src={loungeSrc} />
							</CardMedia>

							<CardActions style={{textAlign:'center'}}>
								<RaisedButton
									href = { "tel:" + phone }
									label = "Call Us"
									linkButton = { true }
									secondary = { true }
								/>
								<RaisedButton
									href = { "mailto:" + email }
									label = "Email Us"
									linkButton = { true }
									primary = { true }
								/>
							</CardActions>
						</Card>
					</div>

					<div className="flex-item-half">
						<Card>
							<CardHeader
								title = {
									<a
										href = { location }
										style = {{ 
											color: accent1Color,
											fontSize: 18,
									}}>{address}</a>
								}

								subtitle = {
									<a
										href = { leesburg }
										style = {{ 
											color: primary2Color,
											fontSize: 16,
									}}>{city}</a>
								}

								avatar = {
									<MapsPlace
										color = { primary3Color }
										style = {{
											marginTop: 12,
											marginLeft: 10,
											width: 30,
											height: 30,
									}}/>
								}
							/>

							<CardText><GMaps/></CardText>

							<CardActions style={{textAlign:'center'}}>
								<RaisedButton
									href = { location }
									label = "Open in Google Maps"
									linkButton = { true }
								/>
							</CardActions>
						</Card>
					</div>
				</div>
			</section>
		);
	}
}

Location.contextTypes = {
	muiTheme: React.PropTypes.object,
};

export default Location;