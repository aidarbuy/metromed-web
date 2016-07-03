import { Card, CardActions, CardHeader, CardMedia, CardText, CardTitle } from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import ReadMoreIcon  from 'material-ui/svg-icons/action/description';
import { Link } from 'react-router';

export default ({ title, subtitle, img, teaser }) => (
	<Card style={{minHeight:400}}>
		<CardMedia overlayContentStyle={{ bottom: -1 }} overlay={
			<CardTitle
				title 	 = { title }
				subtitle = { subtitle }
			/>
		}>
			<img src = { require('../../images/articles/' + img + '-600x300.jpg') } />
		</CardMedia>

		<CardText
			dangerouslySetInnerHTML = {{ __html: teaser }}
			style = {{ fontSize:16, textAlign:'left' }}
		/>

		<CardActions style={{ textAlign: 'right' }}>
			<RaisedButton
				containerElement = {
					<Link to={'/articles/' + img} />
				}
				icon 	= { <ReadMoreIcon /> }
				label = "Read more"
				labelPosition = "before"
				linkButton 		= { true }
				primary 			= { false }
				secondary 		= { true }
				// style 				= {{ margin: 12 }}
				tooltip 			= { "Read article" }
			/>
		</CardActions>
	</Card>
);