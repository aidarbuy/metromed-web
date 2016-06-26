import articles from '../data/articles';
// import ArticleToolbar from '../components/ui/ArticleToolbar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Helmet from 'react-helmet';
import React from 'react';

class Article extends React.Component {
	constructor(props) {
		super(props);
		const { id } = this.props.params;
		const article = this.getArticle(id);
		this.state = {
			prevArticle: article.prevArticle,
			currArticle: article.currArticle,
			nextArticle: article.nextArticle,
			prevButtonDisabled: article.prevButtonDisabled,
			nextButtonDisabled: article.nextButtonDisabled,
			articleIndex: article.articleIndex,
			articlesTotal: article.articlesTotal,
		};
	}

	getArticle(id) {
		for (var i = 0; i <= articles.length - 1; i++) {
			if (articles[i].img.src === id) {
				if (i === 0) 
					return {
						prevArticle: articles[i + 1],
						currArticle: articles[i],
						nextArticle: articles[i],
						prevButtonDisabled: false,
						nextButtonDisabled: true,
						articleIndex: articles.length - i,
					};

				if (i === articles.length - 1)
					return {
						prevArticle: articles[i],
						currArticle: articles[i],
						nextArticle: articles[i - 1],
						prevButtonDisabled: true,
						nextButtonDisabled: false,
						articleIndex: articles.length - i,
					};

				return {
					prevArticle: articles[i + 1],
					currArticle: articles[i],
					nextArticle: articles[i - 1],
					prevButtonDisabled: false,
					nextButtonDisabled: false,
					articleIndex: articles.length - i,
				};
			}
		}
	}

	render() {
		const article = this.state.currArticle;
		const prevArticle = this.state.prevArticle.img.src;
		const nextArticle = this.state.nextArticle.img.src;
		const { articleIndex, prevButtonDisabled, nextButtonDisabled } = this.state;
		const articlesTotal = articles.length;
		const label = articleIndex + "/" + articlesTotal;
		const { canvasColor, accent2Color, textColor, borderColor } = this.context.muiTheme.palette;
		const articleText = article.text.map((p, i) => {
			if (i === 0) return <p key={i} className="article-first-paragraph" dangerouslySetInnerHTML={{__html:p}} />;
			return <p key={i} dangerouslySetInnerHTML={{__html:p}} />;
		});

		return (
			<article>
				<Helmet title={article.title + " - MetromedUC"} />

				<Card style={{margin:0}}>
					<CardHeader
						title="Matthew Beckwith"
						subtitle="Doctor of Medicine"
						avatar={require('../images/articles/matthew-100x100.jpg')}
					/>

					<CardMedia overlay={
						<CardTitle 
							title 	   = { article.title } 
							subtitle   = { article.date } 
							titleStyle = {{ color: accent2Color }}
						/>
					}>
						<img src = {require('../images/articles/' + article.img.src + '-600x300.jpg')}/>
					</CardMedia>

					<CardText style={{fontSize: 16, padding: '5%',}}>{articleText}</CardText>
				</Card>
			</article>
		)
	}
}

Article.contextTypes = {
	muiTheme: React.PropTypes.object,
};

export default Article;