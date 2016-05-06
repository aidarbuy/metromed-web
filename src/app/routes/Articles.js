import React from 'react';
import ArticleCard from '../components/ArticleCard';
import articles from '../data/articles';

export default () => (
  <section>
    <h3>Articles</h3>

    <div className="flex-container">
      {articles.map((article, index) => (
        <div className="flex-item" key = {article.title}>
          <ArticleCard style={{
            margin:'10px !important', 
            padding:'10px !important',
            background:'red !important'
          }}
            title    = {article.title}
            subtitle = {article.date}
            img      = {article.img.src}
            teaser   = {article.teaser}
          />
        </div>
      ))}
    </div>
  </section>
);