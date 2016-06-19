import ArticleCard from '../cards/ArticleCard';
import data from '../../data/articles';
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';

export default React.createClass({
  render() {
    const sliced = data.slice(0, 4);
    const articles = sliced.map((article, index) => (
      <div key = {article.title} className="article-item">
        <ArticleCard 
          title={article.title} subtitle={article.date}
          img={article.img.src} teaser={article.teaser}
        />
      </div>
    ));
    const { accentColor, canvasColor } = this.props;
    return (
      <Paper>
        <Toolbar>
          <ToolbarGroup style={{marginLeft:'auto', marginRight:'auto'}}>
            <ToolbarTitle text="Articles" />
          </ToolbarGroup>
        </Toolbar>

        <div className="flex-container">{articles}</div>

        <Toolbar style={{width:'100%', background:canvasColor}}>
          <ToolbarGroup style={{width:'100%', textAlign:'center'}}>
            <RaisedButton 
              label="All Articles" href="/articles"
              fullWidth={true} linkButton={true}
              secondary={true}
              style={{
                width: '100%',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
            />
          </ToolbarGroup>
        </Toolbar>     
      </Paper>
    );
  }
});
