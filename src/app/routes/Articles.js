import ArticleCard from '../components/cards/ArticleCard';
import CircularProgress from 'material-ui/CircularProgress';
import { database, storage } from '../data/firebase';
import Helmet from 'react-helmet';
import React, { Component } from 'react';

class Articles extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataArticles: [],
			content: <CircularProgress style={{ marginLeft:'auto', marginRight:'auto' }} />,
		};
	}

	componentWillMount() {
		database.ref('/articles').once('value').then((snapshot) => {
			const articles = snapshot.val().reverse();
			const content = articles.map((article, index) => (
				<div className="articles-item" key={article.title}>
					<ArticleCard
						title    = { article.title }
						subtitle = { article.date }
						img      = { article.img.src }
						teaser   = { article.teaser }
					/>
				</div>
			));
			this.setState({content});
		});
	}

	render() {
		const { primary3Color, accent3Color } = this.context.muiTheme.palette;

		return (
			<section>
				<Helmet title="Articles - MetromedUC" />

				<h3 style={{ color:primary3Color }}>Articles</h3>

				<div className="flex-container" style={{ marginTop:20 }}>
					{this.state.content}
				</div>
			</section>
		);
	}
}

Articles.contextTypes = {
	muiTheme: React.PropTypes.object,
	store: React.PropTypes.object,
};

export default Articles;