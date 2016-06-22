import ArticleCard from '../components/cards/ArticleCard';
import articlesArray from '../data/articles';
import { database } from '../data/firebase';
import Helmet from 'react-helmet';
import React from 'react';

function toObject(arr) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i)
    rv[i] = arr[i];
  return rv;
}

// const articlesObject = toObject(articlesArray.reverse());
// console.debug(articlesObject);

class Articles extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			dataSource: [],
			dataArticles: [],
		};
	}

	componentWillMount() {
		// database.ref('/articles').set(articlesObject);
		database.ref('/articles').once('value').then((snapshot) => {
			this.setState({ dataArticles: snapshot.val().reverse() });
		});
	}

	render() {
		const { accent3Color } = this.context.muiTheme.palette;

		return (
			<section>
				<Helmet title="Articles - MetromedUC" />

				<h3>Articles</h3>

				<div className="flex-container" style={{marginTop: 20}}>
					{this.state.dataArticles.map((article, index) => (
						<div className="flex-item" 
							key = {article.title}>
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
};

export default Articles;