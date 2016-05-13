import { grey100 } from 'material-ui/styles/colors';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward';
import articles from '../data/articles';
import FlatButton from 'material-ui/FlatButton';
import Helmet from 'react-helmet';
import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

require('../styles/typography.scss');

export default class Article extends React.Component {
	constructor(props) {
		super(props);
		const { id } = this.props.params;
		const articleObj = this.getArticle(id);
		// console.debug('currArticle:', articleObj.currArticle);
		this.state = {
			prevArticle: articleObj.prevArticle,
			currArticle: articleObj.currArticle,
			nextArticle: articleObj.nextArticle,
			prevButtonDisabled: articleObj.prevButtonDisabled,
			nextButtonDisabled: articleObj.nextButtonDisabled,
		};
	}
	getArticle(id) {
		for (var i = 0; i <= articles.length - 1; i++) {
			if (articles[i].img.src === id) {
				if (i === 0) return {
					prevArticle: articles[i+1],
					currArticle: articles[i],
					nextArticle: articles[i],
					prevButtonDisabled: false,
					nextButtonDisabled: true,
				};
				if (i === articles.length-1) return {
					prevArticle: articles[i-1],
					currArticle: articles[i],
					nextArticle: articles[i],
					prevButtonDisabled: true,
					nextButtonDisabled: false,
				};
				return {
					prevArticle: articles[i+1],
					currArticle: articles[i],
					nextArticle: articles[i-1],
					prevButtonDisabled: false,
					nextButtonDisabled: false,
				};
			}
		}
	}
	render() {
		const article = this.state.currArticle;
		const prevArticle = this.state.prevArticle.img.src;
		const nextArticle = this.state.nextArticle.img.src;
		const articleText = article.text.map((p, i) => {
			if (i === 0)
				return <p key={i} className="article-first-paragraph" dangerouslySetInnerHTML={{__html:p}} />;
			return <p key={i} dangerouslySetInnerHTML={{__html:p}} />;
		});
		return (
			<article>
				<Helmet title={article.title + " - MetromedUC"} />
				<ArticleToolbar prevArticle={prevArticle} nextArticle={nextArticle} prevButtonDisabled={this.state.prevButtonDisabled} nextButtonDisabled={this.state.nextButtonDisabled} />
				<h3 className="article-header">{article.title}</h3>
				<img width="100%" src={require('../images/articles/' + article.img.src + '-600x300.jpg')}/>
				<div style={{margin:50}}>{articleText}</div>
				<ArticleToolbar prevArticle={prevArticle} nextArticle={nextArticle} prevButtonDisabled={this.state.prevButtonDisabled} nextButtonDisabled={this.state.nextButtonDisabled} />
			</article>
		)
	}
};

const ArticleToolbar = React.createClass({
	render() {
		const { prevArticle, nextArticle, prevButtonDisabled, nextButtonDisabled } = this.props;
		return (
			<Toolbar noGutter={true} style={{background:grey100}}>
				<ToolbarGroup firstChild={true}>
					<FlatButton className="button-top-left" label="Previous Article" labelPosition="after" primary={true} icon={<ArrowBack />} linkButton={true} href={"/articles/" + prevArticle} disabled={prevButtonDisabled} />
				</ToolbarGroup>
				<ToolbarGroup>
					<FlatButton className="button-top-left" label="All Articles" labelPosition="after" primary={true} linkButton={true} href="/articles" />
				</ToolbarGroup>
				<ToolbarGroup lastChild={true}>
					<FlatButton className="button-top-right" label="Next Article" labelPosition="before" primary={true} icon={<ArrowForward />} linkButton={true} href={"/articles/" + nextArticle} disabled={nextButtonDisabled} />
				</ToolbarGroup>
			</Toolbar>
		);
	}
});