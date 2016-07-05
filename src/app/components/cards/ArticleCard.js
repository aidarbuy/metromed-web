import { Card, CardActions, CardHeader, CardMedia, CardText, CardTitle } from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import FontIcon from 'material-ui/FontIcon';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import React, { Component } from 'react';
import ReadMoreIcon  from 'material-ui/svg-icons/action/description';
import { storage } from '../../data/firebase';

class ArticleCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// image: <CircularProgress style={{ marginLeft:'auto', marginRight:'auto' }} />,
			// image: <CircularProgress />,
			image: <h5>Loading image</h5>,
			route: '/',
		};
	}

	componentWillMount() {
		const imageRef = 'images/articles/' + this.props.image + '-600x300.jpg';
		storage.ref(imageRef).getDownloadURL().then(imageURL => {
			this.setState({ image: <img src={imageURL} /> });
		}).catch(error => {
			switch (error.code) {
				case 'storage/object_not_found':
					console.debug("File doesn't exist");
					break;
				case 'storage/unauthorized':
					console.debug("User doesn't have permission to access the object");
					break;
				case 'storage/canceled':
					console.debug("User canceled the upload");
					break;
				case 'storage/unknown':
					console.debug("Unknown error occurred, inspect the server response");
					break;
			}
		});
	}

	render() {
		return (
			<Card style={{minHeight:400}}>
				<CardMedia overlay={
					<CardTitle
						title 	 = { this.props.title }
						subtitle = { this.props.subtitle }
					/>
				}>
					{this.state.image}
				</CardMedia>

				<CardText
					dangerouslySetInnerHTML = {{ __html: this.props.teaser }}
					style = {{ fontSize:16, textAlign:'left' }}
				/>

				<CardActions style={{ textAlign:'right' }}>
					<RaisedButton
						containerElement = {
							<Link to={'/articles/' + this.props.image} />
						}
						icon 		  = { <ReadMoreIcon /> }
						label 		  = { "Read more" }
						labelPosition = { "before" }
						linkButton 	  = { true }
						primary 	  = { false }
						secondary 	  = { true }
						tooltip 	  = { "Read article" }
					/>
				</CardActions>
			</Card>
		);
	}
};

export default ArticleCard;