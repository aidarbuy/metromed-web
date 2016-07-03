import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
// import articles from '../data/articles';
// import ArticleToolbar from '../components/ui/ArticleToolbar';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
// import { database, storage } from '../data/firebase';
import FlatButton from 'material-ui/FlatButton';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import React from 'react';

export default () => (
	<h3>Article</h3>
);

// class Article extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		const { id } = this.props.params;
// 	}

// 	componentWillMount() {
// 		storage.ref('/images').once('value').then((snap) => {
// 			const articles = snap.val();
// 			// console.debug(articles.length); // 13
// 			const articlesSliced = articles.slice(articles.length - 4);
// 			this.setState({ dataArticles: articlesSliced.reverse() });
// 		})
// 		.catch((err) => console.debug('error:', err));
// 	}

// 	render() {
// 		const {
// 			canvasColor, accent2Color, textColor, borderColor,
// 		} = this.context.muiTheme.palette;

// 		return (
// 			<section>
// 				<Helmet title={"Article Title - MetromedUC"} />

// 				<div style={{ textAlign: 'left' }}>
// 					<FlatButton
// 						containerElement = { <Link to="/articles" /> }
// 						icon 						 = { <ArrowBack /> }
// 						label 					 = { "All Articles" }
// 						labelPosition 	 = { "after" }
// 						linkButton 			 = { true }
// 						secondary 			 = { true }
// 					/>
// 				</div>

// 				<article>
// 					<Card style={{margin:0}}>
// 						<CardHeader
// 							title="Matthew Beckwith"
// 							subtitle="Doctor of Medicine"
// 							avatar={require('../images/articles/matthew-100x100.jpg')}
// 						/>

// 						<CardMedia overlay={
// 							<CardTitle 
// 								title 	   = { "Article Title" } 
// 								subtitle   = { "Article Subtitle" } 
// 								titleStyle = {{ color: accent2Color }}
// 							/>
// 						}>
// 							{/*
// 							<img src = { require(storage.ref('images/' + article.img.src + '-600x300.jpg')) }/>
// 							*/}
// 						</CardMedia>

// 						<CardText style={{fontSize: 16, padding: '5%',}}>
// 							{ "Article Text" }
// 						</CardText>
// 					</Card>
// 				</article>
// 			</section>
// 		)
// 	}
// }

// Article.contextTypes = {
// 	muiTheme: React.PropTypes.object,
// 	store: React.PropTypes.object,
// };

// export default Article;