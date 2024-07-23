import { useSelector } from 'react-redux';
import { selectArticles } from '../../../store/reducers/articlesReducer';
import { getDeclination } from '../../../utils/utils';
import { getTermArticles, getTermAuthors } from '../../../utils/articles';

import './Topic.scss';
import './TopicTheme.scss';

import drag from '../../../assets/img/icons/drag-dots.svg';

const Topic = ({ type, term, item, setBookmarks }) => {
  const articles = useSelector(selectArticles);

  const amount = {
    articles: getTermArticles(articles, type, term, item.id).length,
    authors: getTermAuthors(articles, type, term, item.id).length,
  };

  const handleToggleBookmark = () => {
    setBookmarks((bookmarks) =>
      bookmarks.map((bookmark) =>
        bookmark.id === item.id
          ? { ...bookmark, active: !bookmark.active }
          : bookmark
      )
    );
  };

  return (
    <div className="topic">
      <div className="topic__handle">
        <img src={drag} />
      </div>

      <div
        className={`topic__icon ${
          !item.icon && item.color ? `color--${item.color}` : ''
        }`}
      >
        {item.icon ? <img src={item.icon} /> : <p>{item.name[0]}</p>}
      </div>

      <div className="topic__content">
        <p className="topic__title">{item.name}</p>

        <div className="topic__meta">
          <p>{`${
            amount.articles > 1000
              ? `${parseInt(amount.articles / 1000)} thousand`
              : amount.articles
          } ${getDeclination(amount.articles, 'post||s|s')}`}</p>

          <p>{`${amount.authors} ${getDeclination(
            amount.authors,
            'author||s|s'
          )}`}</p>
        </div>
      </div>

      <div className="topic__nav">
        <div
          className={`toggle ${item.active ? 'is-active' : ''}`}
          onClick={handleToggleBookmark}
        >
          <div className="toggle__input"></div>
        </div>
      </div>
    </div>
  );
};

export default Topic;
