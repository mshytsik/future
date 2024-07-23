import ShortArticle from '../ShortArticle/ShortArticle';

import './ShortNews.scss';

const ShortNews = ({ articles, className = '' }) => {
  return (
    <div className={`short-news ${className}`}>
      {articles.map((article) => (
        <ShortArticle
          key={article.id}
          article={article}
          className="short-news__item"
        />
      ))}
    </div>
  );
};

export default ShortNews;
