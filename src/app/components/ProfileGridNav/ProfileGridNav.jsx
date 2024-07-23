import { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../App';
import useClickOutside from '../../hooks/useClickOutside';

import { Button, Select, Filter } from '../shared';

import plusIcon from '../../assets/img/icons/plus-w.svg';
import plusIconDark from '../../assets/img/icons/plus-grey.svg';
import filterIcon from '../../assets/img/icons/filter.svg';
import filterIconDark from '../../assets/img/icons/theme/filter.svg';

import './ProfileGridNav.scss';
import './ProfileGridNavTheme.scss';

const ProfileGridNav = ({
  tab,
  filter: {
    options: filterOptions,
    value: filterValue,
    setValue: setFilterValue,
  },
  currentUser,
  reactions,
}) => {
  const theme = useContext(ThemeContext);

  const [showReactionsFilter, setShowReactionsFilter] = useState(false);
  const outsideRef = useRef(null);
  useClickOutside(outsideRef, () => setShowReactionsFilter(false));

  const navigate = useNavigate();

  return (
    <div className="grid-head__nav">
      {tab !== 'reactions' && (
        <Select
          options={filterOptions}
          value={filterValue}
          setOptionValue={setFilterValue}
          className="grid-head__nav-item grid-head__nav-item--select select--left-xs"
        />
      )}

      {currentUser && tab === 'posts' && (
        <Button
          callback={() => navigate('/add/post/')}
          title="Add a post"
          icon={{ iconSrc: theme === 'light' ? plusIcon : plusIconDark }}
          type="primary"
          className="grid-head__nav-item grid-head__nav-item--button"
        />
      )}

      {currentUser && tab === 'conferences' && (
        <Button
          callback={() => navigate('/add/conference/')}
          title="Add a conference"
          icon={{ iconSrc: theme === 'light' ? plusIcon : plusIconDark }}
          type="primary"
          className="grid-head__nav-item grid-head__nav-item--button"
        />
      )}

      {tab === 'reactions' && (
        <div
          className="grid-head__nav-item grid-head__filter grid-filter hide-xl hide-lg hide-md"
          ref={outsideRef}
        >
          <Button
            callback={() => setShowReactionsFilter((value) => !value)}
            icon={{
              iconSrc: theme === 'light' ? filterIcon : filterIconDark,
              iconOnly: true,
            }}
            type="secondary"
            size="lg"
            className="grid-filter__button"
          />

          <div
            className={`grid-filter__popup is-popup reactions-filter ${
              showReactionsFilter ? 'is-active' : ''
            }`}
          >
            <Filter
              title="Activity"
              options={reactions.options}
              setOptions={reactions.setValue}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileGridNav;
