import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectArticles } from '../../store/reducers/articlesReducer';
import { calculateUserRating } from '../../utils/utils';

import { User } from '../shared';

import './Leader.scss';
import './LeaderTheme.scss';

const Leader = ({ leader, className = '' }) => {
  const companyArticles = useSelector(selectArticles).filter(
    (article) => article.author === leader.id && article.status === 'publish'
  );

  return (
    <Link to={`/author/${leader.nickname}`} className={`leader ${className}`}>
      <User
        user={leader}
        title={leader.username}
        subtitle={leader.details.area}
        verifyNearTitle
        className="leader__user"
      />

      <p className="leader__rating">{calculateUserRating(companyArticles)}</p>
    </Link>
  );
};

export default Leader;
