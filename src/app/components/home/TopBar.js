import {
	Card, CardActions, CardHeader, CardMedia, CardText, CardTitle,
} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import HoursOfOperation from './HoursOfOperation';
import React from 'react';
require('../../styles/top-bar.scss');

class TopBar extends React.Component {
	constructor(props) {
		super(props);
		this.constructor.updateColors = this.constructor.updateColors.bind(this);
	}

	componentWillMount() {
		const { primary1Color, primary2Color, alternateTextColor, primary3Color } = this.context.muiTheme.palette;
		this.setState({
			styles : {
				CardTitle: {
					fontWeight: 400,
					paddingBottom: 0,
				},
				link: {
					color: alternateTextColor,
					textDecoration: 'none',
				},
				CardText : {
					fontSize: 19,
					fontWeight: 400,
					lineHeight: 1.4,
					verticalAlign: 'middle',
					display: 'inline-block',
				},
			},
		});
	}

	static updateColors() {
		// console.debug("TopBar static updateColors()");
		const { alternateTextColor, primary3Color, primary2Color } = this.context.muiTheme.palette;
		Hours.updateColors(alternateTextColor, primary3Color, primary2Color);
	}

	render() {
		const { 
			primary1Color, primary2Color, alternateTextColor, primary3Color,
		} = this.context.muiTheme.palette;
		const { styles } = this.state;

		return (
			<div className="flex-container">
				<div className="flex-item">
					<Card className="cell" style={{background:primary1Color}}>
						<CardTitle title="Contact Info" titleColor={alternateTextColor} style={styles.CardTitle}/>

						<CardText color={alternateTextColor} style={styles.CardText}>
							<p><a href="tel:7036874158" style={styles.link}>(703) 687-4158</a></p>
							<p><a href="/location" style={styles.link}>952 Edwards Ferry Rd NE</a><br/><a href="/location" style={styles.link}>Leesburg, VA 20176</a></p>
							<p><a href="mailto:info@metromeduc.com" style={styles.link}>info@metromeduc.com</a></p>
						</CardText>
					</Card>
				</div>

				<div className="flex-item">
					<Card className="cell" style={{background:primary2Color}}>
						<CardTitle title="Hours of Operation" titleColor={alternateTextColor} style={styles.CardTitle}/>

						<CardText color={alternateTextColor} style={styles.CardText}>
							<HoursOfOperation textColor={alternateTextColor} colonColor={primary3Color} bgColor={primary2Color} />
						</CardText>
					</Card>
				</div>

				<div className="flex-item">
					<Card className="cell" style={{background:primary1Color}}>
						<CardTitle title="Urgent Care" titleColor={alternateTextColor} style={styles.CardTitle} />

						<CardText color={alternateTextColor} style={styles.CardText}>
							<p>Our Emergency Medicine doctors can diagnose and treat a wide variety of illnessess and injuries.</p>
						</CardText>
					</Card>
				</div>

				<div className="flex-item">
					<Card className="cell" style={{background:primary2Color}}>
						<CardTitle title="Holidays" titleColor={alternateTextColor} style={styles.CardTitle}/>

						<CardText color={alternateTextColor} style={styles.CardText}>
							<p>Major Holidays Observed</p>
							<Divider style={{background: primary3Color}} />
							{/*<p>No Appointments Necessary</p>*/}
							<p style={{fontWeight:500, fontSize:'110%'}}>We are closed July 4th</p>
						</CardText>
					</Card>
				</div>
			</div>
		);
	}
}

TopBar.contextTypes = {
	muiTheme: React.PropTypes.object,
};

export default TopBar;