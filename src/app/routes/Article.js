import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
// import ArticleToolbar from '../components/ui/ArticleToolbar';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { database, storage } from '../data/firebase';
import FlatButton from 'material-ui/FlatButton';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import React from 'react';

class Article extends React.Component {
	constructor(props) {
		super(props);
		const { id } = this.props.params;
		this.state = {
			// image: <CircularProgress />,
			image: <h5>Loading image</h5>,
			title: '',
			date: '',
			text: 'Loading article text...',
		};
	}

	componentWillMount() {
		let msg1 = "File doesn't exist",
			msg2 = "User doesn't have permission to access the object",
			msg3 = "User canceled the upload",
			msg4 = "Unknown error occurred, inspect the server response";
		const { id } = this.props.params;
		const imageRef = 'images/articles/' + id + '-600x300.jpg';
		storage.ref(imageRef).getDownloadURL().then(imageURL => {
			this.setState({ image: <img src={imageURL} /> });
		}).catch(error => {
			switch (error.code) {
				case 'storage/object_not_found': console.log(msg1); break;
				case 'storage/unauthorized': console.log(msg2); break;
				case 'storage/canceled': console.log(msg3); break;
				case 'storage/unknown': console.log(msg4); break;
			}
		});

		var ref = firebase.database().ref("articles");
		ref.orderByChild("img/src").equalTo(id).once("child_added", snap => {
			const article = snap.val();
			const textMap = article.text.map((p, i) => (
				<p key={i} dangerouslySetInnerHTML={{ __html:p }} />
			));
			this.setState({
				title: article.title,
				date: article.date,
				text: textMap,
			});
		});
	}

	render() {
		const {
			canvasColor, accent2Color, textColor, borderColor,
		} = this.context.muiTheme.palette;

		return (
			<section>
				<Helmet title={this.state.title + " - MetromedUC"} />

				<div style={{ textAlign:'left' }}>
					<FlatButton
						containerElement = { <Link to="/articles" /> }
						icon 			 = { <ArrowBack /> }
						label 			 = { "All Articles" }
						labelPosition 	 = { "after" }
						linkButton 		 = { true }
						secondary 		 = { true }
					/>
				</div>

				<article>
					<Card style={{margin:0}}>
						<CardHeader
							title="Matthew Beckwith"
							subtitle="Doctor of Medicine"
							avatar={require('../images/doctors/matthew-100x100.jpg')}
						/>

						<CardMedia overlay={
							<CardTitle 
								title 	   = { this.state.title } 
								subtitle   = { this.state.date } 
								titleStyle = {{ color: accent2Color }}
							/>
						}>
							{this.state.image}
						</CardMedia>

						<CardText style={{fontSize: 16, padding: '5%',}}>
							{this.state.text}
						</CardText>
					</Card>
				</article>
			</section>
		)
	}
}

Article.contextTypes = {
	muiTheme: React.PropTypes.object,
	store: React.PropTypes.object,
};

export default Article;