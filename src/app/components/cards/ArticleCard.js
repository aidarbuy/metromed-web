import {Card, CardActions, CardHeader, CardMedia, CardText, CardTitle} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import ReadMoreIcon  from 'material-ui/svg-icons/action/description';
import { Link } from 'react-router';

export default React.createClass({
	render() {
		const { props } = this;

		return (
			<Card style={{minHeight:420}}>
				<CardMedia overlay={
					<CardTitle
						title 	 = { props.title }
						subtitle = { props.subtitle }
					/>
				}>
					<img src = { require('../../images/articles/' + props.img + '-600x300.jpg') } />
				</CardMedia>

				<CardText
					dangerouslySetInnerHTML = {{ __html:props.teaser }}
					style = {{ fontSize:16, textAlign:'left' }}
				/>

				<CardActions style={{textAlign:'right'}}>
					<RaisedButton
						containerElement = {
							<Link to={'/articles/' + props.img} />
						}
						icon 	= { <ReadMoreIcon /> }
						label = "Read more"
						labelPosition = "before"
						linkButton 		= { true }
						primary 			= { false }
						secondary 		= { true }
						style 				= {{ margin: 12 }}
						tooltip 			= { "Read article" }
					/>
				</CardActions>
			</Card>
		)
	}
});