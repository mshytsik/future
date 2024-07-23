import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUsers } from '../../store/reducers/usersReducer';
import { getDeclination } from '../../utils/utils';
import { getTimeAgo } from '../../utils/dateTime';

import incognito from '../../assets/img/icons/account.svg';

import './ShortArticle.scss';
import './ShortArticleTheme.scss';

const ShortArticle = ({ article, className = '' }) => {
  const users = useSelector(selectUsers);

  return (
    <Link
      to={`/${article.type}/${article.id}`}
      className={`short-article ${className}`}
    >
      <p
        className="short-article__body"
        data-time={getTimeAgo(article.dateTime)}
      >
        {article.title}
      </p>

      {article.stats.liked.length > 0 && (
        <div className="short-article__footer">
          {article.stats.liked && (
            <div className="short-article__meta">
              <div className="short-article__photos">
                {article.stats.liked.slice(0, 3).map((like) => (
                  <div key={like.userId} className="short-article__photo">
                    <img
                      src={
                        users.find((item) => item.id === like.userId)?.photo ??
                        incognito
                      }
                    />
                  </div>
                ))}
              </div>
              <p>{`${article.stats.liked.length} ${getDeclination(
                article.stats.liked.length,
                'like||s|s'
              )}`}</p>
            </div>
          )}
        </div>
      )}
    </Link>
  );
};

export default ShortArticle;
