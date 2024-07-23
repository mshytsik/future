import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectArticles } from '../../store/reducers/articlesReducer';
import { sortArticles } from '../../utils/sort';

import Titlearea from '../../components/Titlearea/Titlearea';
import ArticlesGrid from '../../components/ArticlesGrid/ArticlesGrid';
import Main from '../../layout/main/Main/Main';

const Conferences = () => {
  const tabsOptions = [
    { name: 'All', value: 'all' },
    { name: 'Offline', value: 'offline' },
    { name: 'Online', value: 'online' },
  ];

  const [activeTab, setActiveTab] = useState('all');

  const tabs = {
    options: tabsOptions,
    activeTab,
    setActiveTab,
  };

  let articles = useSelector(selectArticles).filter(
    (article) =>
      article.type === 'conference' &&
      article.status === 'publish' &&
      ['all', article.details.format].includes(activeTab)
  );

  const filterOptions = [
    { id: 'popular', name: 'Popular' },
    { id: 'new', name: 'New' },
    { id: 'old', name: 'Old' },
  ];

  const [filterValue, setFilterValue] = useState('new');

  const filter = {
    options: filterOptions,
    value: filterValue,
    setValue: setFilterValue,
  };

  const body = (
    <div className="row row-16">
      <div className="col col-2 col-xl-1 col-lg-0"></div>

      <div className="main-body__content col col-12 col-xl-10 col-lg-12">
        <Titlearea breadcrumbs={[{ name: 'Events' }]} title="Events" />

        <ArticlesGrid
          head={{ tabs, filter }}
          articles={articles.sort((a, b) =>
            filterValue === 'popular'
              ? sortArticles(a, b, 'popular')
              : sortArticles(
                  a,
                  b,
                  'date',
                  filterValue === 'new' ? 'desc' : 'asc'
                )
          )}
        />
      </div>

      <div className="col col-2 col-xl-1 col-lg-0"></div>
    </div>
  );

  return <Main body={body} className="page-grid" />;
};

export default Conferences;
