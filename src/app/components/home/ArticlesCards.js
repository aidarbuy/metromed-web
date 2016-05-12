import { grey50 } from'material-ui/styles/colors';
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
          title    = {article.title}
          subtitle = {article.date}
          img      = {article.img.src}
          teaser   = {article.teaser}
        />
      </div>
    ));
    return (
      <Paper>
        <Toolbar>
          <ToolbarGroup style={{marginLeft:'auto', marginRight:'auto'}}>
            <ToolbarTitle text="Articles" />
          </ToolbarGroup>
        </Toolbar>
        <div className="flex-container">{articles}</div>
        <Toolbar style={{width:'100%',background:grey50}}>
          <ToolbarGroup style={{
            width: '100%',
            textAlign: 'center',
            // border:'1px solid red'
          }}>
            <RaisedButton label="All Articles" href="/articles"
              fullWidth={true} linkButton={true}
              style={{
                width: '100%',
                marginLeft:'auto',
                marginRight:'auto',
              }}
            />
          </ToolbarGroup>
        </Toolbar>     
      </Paper>
    );
  }
});