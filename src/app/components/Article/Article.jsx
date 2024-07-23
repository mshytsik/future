import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUsers } from '../../store/reducers/usersReducer';
import { selectTerms } from '../../store/reducers/articlesReducer';
import { getDeclination } from '../../utils/utils';
import { getDateText } from '../../utils/dateTime';
import { useOnResize } from '../../hooks';

import { User, Tag } from '../shared';
import ArticleNav from '../ArticleNav/ArticleNav';

import './Article.scss';
import './ArticleTheme.scss';

const Article = ({ article, types = '', className = '' }) => {
  let typeClassNames = types
    .split(' ')
    .map((type) => `article--${type}`)
    .join(' ');

  const navigate = useNavigate();

  const users = useSelector(selectUsers);
  const author = users.find((user) => user.id === article.author);
  const categories = useSelector(selectTerms('post', 'categories'));

  const authorMeta = (
    <User
      user={author}
      title=""
      subtitle={author.username}
      className="article__meta user--link"
      callback={(e) => {
        e.preventDefault();
        navigate(`/author/${author.nickname}`);
      }}
    />
  );

  const articleDate = getDateText(article.dateTime);

  const articleCategory = categories.find(
    (category) => article.category === category.id
  );

  const [showArticleNav, setShowArticleNav] = useState(true);

  const footerRef = useRef(null);
  const footerMetaRef = useRef(null);

  const handleResize = () => {
    const NAV_BODY_WIDTH = 120;
    setShowArticleNav(
      footerRef.current.offsetWidth - footerMetaRef.current.offsetWidth <
        NAV_BODY_WIDTH
    );
  };

  useOnResize(handleResize);

  return (
    <Link
      to={`/${article.type}/${article.id}`}
      className={`article ${typeClassNames} ${className}`}
    >
      {article.image && (
        <div className="article__image">
          <img src={article.image} />
        </div>
      )}

      <div className="article__content">
        <div className="article__header">
          {authorMeta}
          <p className="article__meta article__date">{articleDate}</p>
        </div>

        <div className="article__body">
          <p className="article__title">{article.title}</p>
          <p className="article__subtitle">{article.description}</p>
        </div>

        <div className="article__footer" ref={footerRef}>
          <div className="article__footer-meta" ref={footerMetaRef}>
            {authorMeta}

            {articleCategory && (
              <div className="article__meta article__meta--tags">
                <Tag
                  tag={{ type: 'post', ...articleCategory }}
                  type="category"
                />
              </div>
            )}

            {article.minutesToRead && (
              <p className="article__meta article__time">
                {`${article.minutesToRead} ${getDeclination(
                  article.minutesToRead,
                  'minute||s|s'
                )} to read`}
              </p>
            )}

            <p className="article__meta article__date">{articleDate}</p>
          </div>

          <ArticleNav
            article={article}
            isHidden={showArticleNav}
            className="article__nav"
          />
        </div>
      </div>
    </Link>
  );
};

export default Article;
