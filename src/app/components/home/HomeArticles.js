import ArticleCard from '../cards/ArticleCard';
// import { database } from '../../data/firebase';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';

export default () => (
	<h3>Articles</h3>
);

// class ArticlesCards extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = { 
// 			dataSource: [],
// 			dataArticles: [],
// 		};
// 	}

// 	componentWillMount() {
// 		database.ref('/articles').once('value').then((snap) => {
// 			const articles = snap.val();
// 			// console.debug(articles.length); // 13
// 			const articlesSliced = articles.slice(articles.length - 4);
// 			this.setState({ dataArticles: articlesSliced.reverse() });
// 		})
// 		.catch((err) => console.debug('error:', err));
// 	}

// 	render() {
// 		const { accentColor, canvasColor } = this.props;
// 		const { primary3Color, accent3Color } = this.context.muiTheme.palette;

// 		return (
// 			<Paper style={{ marginTop:20 }}>
// 				<Toolbar>
// 					<ToolbarGroup style={{marginLeft:'auto', marginRight:'auto'}}>
// 						<ToolbarTitle text="Articles" />
// 					</ToolbarGroup>
// 				</Toolbar>

// 				<div className="flex-container" style={{ marginTop:0 }}>
// 					{this.state.dataArticles.map((article, index) => (
// 						<div className="home-articles-item"
// 							key = {article.title}>
// 							<ArticleCard
// 								title    = { article.title }
// 								subtitle = { article.date }
// 								img      = { article.img.src }
// 								teaser   = { article.teaser }
// 							/>
// 						</div>
// 					))}
// 				</div>

// 				<Toolbar style={{width:'100%', background:canvasColor}}>
// 					<ToolbarGroup style={{width:'100%', textAlign:'center'}}>
// 						<RaisedButton 
// 							label="All Articles" href="/articles"
// 							fullWidth={true} linkButton={true}
// 							secondary={true}
// 							style={{
// 								width: '100%',
// 								marginLeft: 'auto',
// 								marginRight: 'auto'
// 							}}
// 						/>
// 					</ToolbarGroup>
// 				</Toolbar>
// 			</Paper>
// 		);
// 	}
// }

// ArticlesCards.contextTypes = {
// 	muiTheme: React.PropTypes.object,
// };

// export default ArticlesCards;