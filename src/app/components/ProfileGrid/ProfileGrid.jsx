import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectUsers,
  selectCurrentUser,
} from '../../store/reducers/usersReducer';
import { selectArticles } from '../../store/reducers/articlesReducer';
import { sortArticles } from '../../utils/sort';

import ProfileGridNav from '../ProfileGridNav/ProfileGridNav';
import EmptyGridBlock from '../EmptyGridBlock/EmptyGridBlock';
import ArticlesGrid from '../ArticlesGrid/ArticlesGrid';
import Reactions from '../Reactions/Reactions';

import { Tabs } from '../shared';

import './ProfileGrid.scss';

const ProfileGrid = ({ user, className }) => {
  const users = useSelector(selectUsers);
  const currentUser = useSelector(selectCurrentUser);

  let articles = useSelector(selectArticles);
  const userArticles = articles.filter((article) => article.author === user.id);

  const reactions = [];

  articles.map(
    (article) =>
      article.author === user.id &&
      reactions.push(
        ...article.stats.liked.map((reaction) => ({
          ...reaction,
          type: 'like',
          articleId: article.id,
        }))
      )
  );

  users.map(
    (item) =>
      item.id !== user.id &&
      reactions.push(
        ...item.subscriptions
          .filter((subscription) => subscription.userId === user.id)
          .map((reaction) => ({
            ...reaction,
            userId: item.id,
            type: 'subscribe',
          }))
      )
  );

  let gridData = {
    posts: {
      name: 'Posts',
      data: userArticles.filter(
        (article) => article.type === 'post' && article.status === 'publish'
      ),
    },
    conferences: {
      name: 'Conferences',
      data: userArticles.filter(
        (article) =>
          article.type === 'conference' && article.status === 'publish'
      ),
    },
  };

  if (currentUser?.id === user.id) {
    gridData = {
      ...gridData,
      ...{
        reactions: {
          name: 'Reactions',
          data: reactions,
        },
        favorite: {
          name: 'Favorite',
          data: articles.filter(
            (article) =>
              user.favorite.includes(article.id) &&
              (article.status === 'publish' || user.id === article.author)
          ),
        },
        draft: {
          name: 'Drafts',
          data: userArticles.filter((article) => article.status === 'draft'),
        },
        pending: {
          name: 'Pending moderation',
          data: (user.isModerator ? articles : userArticles).filter(
            (article) => article.status === 'pending'
          ),
        },
        rejected: {
          name: 'Rejected',
          data: userArticles.filter((article) => article.status === 'rejected'),
        },
      },
    };
  }

  const [activeTab, setActiveTab] = useState('posts');

  const tabs = Object.entries(gridData)
    .filter(
      ([key, value]) =>
        ['posts', 'conferences'].includes(key) || value.data.length > 0
    )
    .map(([key, value]) => ({
      name: value.name,
      value: key,
      count: value.data.length,
    }));

  useEffect(() => {
    if (!tabs.find((tab) => tab.value === activeTab)) {
      setActiveTab(tabs[0].value);
    }
  }, [tabs]);

  const filterOptions = [
    { id: 'popular', name: 'Popular' },
    { id: 'new', name: 'New' },
    { id: 'old', name: 'Old' },
  ];

  const [filterValue, setFilterValue] = useState('new');

  const [activeReactions, setActiveReactions] = useState(['like', 'subscribe']);

  const navigate = useNavigate();

  const reactionsFilterGroups = {
    like: 'Likes',
    subscribe: 'Subscriptions',
  };

  const reactionsFilterOptions = Object.entries(reactionsFilterGroups).map(
    ([value, name]) => ({
      name,
      value,
      isActive: activeReactions.includes(value),
    })
  );

  const gridRef = useRef(null);
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const tabKey = location.hash.slice(1);
      if (Object.keys(gridData).includes(tabKey)) {
        setActiveTab(tabKey);
      }

      setTimeout(
        () =>
          gridRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          }),
        100
      );
    }
  }, []);

  return (
    <div className={`profile-grid ${className}`} ref={gridRef}>
      <div className="profile-grid__head grid-head">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          setActive={setActiveTab}
          className="grid-head__tabs"
        />

        <ProfileGridNav
          tab={activeTab}
          filter={{
            options: filterOptions,
            value: filterValue,
            setValue: setFilterValue,
          }}
          currentUser={currentUser}
          reactions={{
            options: reactionsFilterOptions,
            value: activeReactions,
            setValue: setActiveReactions,
          }}
        />
      </div>

      {Object.entries(gridData).map(
        ([key, value]) =>
          key === activeTab && (
            <div key={key} className="profile-grid__body">
              {value.data.length === 0 && (
                <EmptyGridBlock
                  title={`You don't have any ${
                    key === 'posts' ? 'posts' : 'conferences'
                  } yet`}
                  subtitle={`Add a new ${
                    key === 'posts' ? 'post' : 'conference'
                  } to see records here`}
                  callback={() =>
                    navigate(`/add/${key === 'posts' ? 'post' : 'conference'}`)
                  }
                  className="profile-grid__empty"
                />
              )}

              {value.data.length > 0 &&
                (key === 'reactions' ? (
                  <Reactions
                    reactions={reactions}
                    filter={{
                      options: reactionsFilterOptions,
                      value: activeReactions,
                      setValue: setActiveReactions,
                    }}
                  />
                ) : (
                  <ArticlesGrid
                    articles={value.data.sort((a, b) =>
                      filterValue === 'popular'
                        ? sortArticles(a, b, 'popular')
                        : sortArticles(
                            a,
                            b,
                            'date',
                            filterValue === 'new' ? 'desc' : 'asc'
                          )
                    )}
                    filterValue={filterValue}
                    pagination={false}
                  />
                ))}
            </div>
          )
      )}
    </div>
  );
};

export default ProfileGrid;
