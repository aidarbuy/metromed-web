import {Card, CardActions, CardHeader, CardMedia, CardText, CardTitle} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import ReadMoreIcon  from 'material-ui/svg-icons/action/description';

export default React.createClass({
	render() {
		const { props } = this;
		const img = props.img;
		const src = require("../../images/articles/" + img + "-600x300.jpg");

		return (
			<Card style={{minHeight:420}}>
				<CardMedia overlay={
					<CardTitle title={props.title} subtitle={props.subtitle} />
				}>
					<img src={src} />
				</CardMedia>

				<CardText dangerouslySetInnerHTML={{__html:props.teaser}} style={{
					fontSize: 16,
					textAlign: 'left',
				}}/>

				<CardActions style={{textAlign:'right'}}>
					<RaisedButton
						icon={<ReadMoreIcon />}
						href={"/articles/" + props.img}
						label="Read more"
						labelPosition="before"
						linkButton={true}
						primary={false} secondary={true}
						style={{margin:12}}
					/>
				</CardActions>
			</Card>
		)
	}
});