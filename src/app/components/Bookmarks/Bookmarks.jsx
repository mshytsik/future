import { useState, useEffect } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { useSelector, useDispatch } from 'react-redux';
import { selectTerms } from '../../store/reducers/articlesReducer';
import { selectCurrentUser, edit } from '../../store/reducers/usersReducer';
import { getDeclination } from '../../utils/utils';

import { Topic } from '../shared';

import './Bookmarks.scss';
import './BookmarksTheme.scss';

const Bookmarks = ({ title }) => {
  const categories = useSelector(selectTerms('post', 'categories')).filter(
    (category) => category.slug !== 'knowledge-base'
  );

  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const [bookmarks, setBookmarks] = useState(
    user.bookmarks.length
      ? user.bookmarks.map((bookmark) => ({
          ...categories.find((category) => category.id === bookmark.id),
          active: bookmark.active,
        }))
      : categories.map((item) => ({ ...item, active: true }))
  );

  useEffect(() => {
    dispatch(
      edit({
        ...user,
        bookmarks: bookmarks.map((bookmark) => ({
          id: bookmark.id,
          active: bookmark.active,
        })),
      })
    );
  }, [bookmarks]);

  return (
    <div className="bookmarks">
      {title && (
        <p className="bookmarks__title">{`${bookmarks.length} ${getDeclination(
          bookmarks.length,
          title
        )}`}</p>
      )}

      <ReactSortable
        list={bookmarks}
        setList={setBookmarks}
        handle=".topic__handle"
        dragoverBubble={false}
        animation={300}
        className="bookmarks__list"
      >
        {bookmarks.map((bookmark) => (
          <Topic
            key={bookmark.id}
            type="post"
            term="category"
            item={bookmark}
            setBookmarks={setBookmarks}
          />
        ))}
      </ReactSortable>
    </div>
  );
};

export default Bookmarks;
