import React      from 'react';
import Helmet     from 'react-helmet';
import FlatButton from 'material-ui/FlatButton';
import ArrowBack  from 'material-ui/svg-icons/navigation/arrow-back';
import Paper      from 'material-ui/Paper';
import Card       from 'material-ui/Card';
import CardMedia  from 'material-ui/Card/CardMedia';
import articles   from '../data/articles';

export default React.createClass({
  getArticle(id) {
    for (var i = 0; i <= articles.length - 1; i++) {
      if (articles[i].img.src === id)
        return articles[i];
    }
  },

  render() {
    const { id } = this.props.params;
    const src = '/images/articles/' + id + '-600x300.jpg';
    const article = this.getArticle(id);
    const articleText = article.text.map((p, i) => (
      <p key={i} dangerouslySetInnerHTML={{__html:p}} />
    ));

    return (
      <article>
        <Helmet title={article.title + " - MetromedUC"} />

        <FlatButton className="button-top-left"
          label="All Articles" 
          labelPosition="after"
          primary={true}
          icon={<ArrowBack />}
          linkButton={true}
          href="/articles"
        />

        <h3 className="article-header">{article.title}</h3>

        <img width="100%" src={src}/>

        <div style={{margin:50}}>{articleText}</div>
      </article>
    )
  }
});
