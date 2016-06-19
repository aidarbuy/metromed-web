import ArticleCard from '../components/cards/ArticleCard';
import dataArticles from '../data/articles';
import Helmet from 'react-helmet';
import React from 'react';

class Articles extends React.Component {
	constructor(props) {
		super(props);
		this.state = { dataSource: [] };
	}

	render() {
		const { accent3Color } = this.context.muiTheme.palette;
		const articlesMap = dataArticles.map((article, index) => (
			<div className="flex-item" 
				key = {article.title}>
				<ArticleCard
					title    = { article.title }
					subtitle = { article.date }
					img      = { article.img.src }
					teaser   = { article.teaser }
				/>
			</div>
		));

		return (
			<section>
				<Helmet title="Articles - MetromedUC" />

				<h3>Articles</h3>

				<div className="flex-container" style={{marginTop: 20}}>
					{articlesMap}
				</div>
			</section>
		);
	}
}

Articles.contextTypes = {
	muiTheme: React.PropTypes.object,
};

export default Articles;