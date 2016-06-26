import ArticleCard from '../components/cards/ArticleCard';
import { database } from '../data/firebase';
import Helmet from 'react-helmet';
import React from 'react';

class Articles extends React.Component {
	constructor(props) {
		super(props);
		this.state = { dataArticles:[] };
	}

	componentWillMount() {
		database.ref('/articles').once('value').then((snapshot) => {
			this.setState({ dataArticles: snapshot.val().reverse() });
		});
	}

	render() {
		const { primary3Color, accent3Color } = this.context.muiTheme.palette;

		return (
			<section>
				<Helmet title="Articles - MetromedUC" />

				<h3 style={{color:primary3Color}}>Articles</h3>

				<div className="flex-container" style={{marginTop: 20}}>
					{this.state.dataArticles.map((article, index) => (
						<div className="articles-item" key={article.title}>
							<ArticleCard
								title    = { article.title }
								subtitle = { article.date }
								img      = { article.img.src }
								teaser   = { article.teaser }
							/>
						</div>
					))}
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