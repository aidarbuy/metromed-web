import React from 'react';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Toolbar from 'material-ui/Toolbar';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import ToolbarSeparator from 'material-ui/Toolbar/ToolbarSeparator';
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle';
import DropDownMenu from 'material-ui/DropDownMenu';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { grey50 } from'material-ui/styles/colors';

import articlesData from '../../data/articles';
import ArticleCard from '../ArticleCard';

const articles = articlesData.slice(0, 4);

module.exports = () => (
  <Paper>
    <Toolbar>
      <ToolbarGroup 
        style={{
          marginLeft:'auto',
          marginRight:'auto',
        }}
      >
        <ToolbarTitle text="Articles" />
      </ToolbarGroup>
    </Toolbar>

    <div className="flex-container">
      {articles.map((article, index) => (
        <div 
          key = {article.title}
          className="article-item"
        >
          <ArticleCard
            title    = {article.title}
            subtitle = {article.date}
            img      = {article.img.src}
            teaser   = {article.teaser}
          />
        </div>
      ))}
    </div>

    <Toolbar style={{background:grey50}}>
      <ToolbarGroup style={{
        width:'100%'
      }}
        firstChild={true}
        lastChild={true}
      >
        <RaisedButton 
          fullWidth={true}
          style={{
            textAlign:'center',
            // margin:0,
            // border:'1px dashed green',
            // width:'110%',
          }}
          label="View All Articles"
          linkButton={true}
          href="/articles"
        />
      </ToolbarGroup>
    </Toolbar>     
  </Paper>
)