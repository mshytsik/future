import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectArticles,
  selectTerms,
} from '../../store/reducers/articlesReducer';
import { selectUsers } from '../../store/reducers/usersReducer';
import { sortArticles } from '../../utils/sort';

import Main from '../../layout/main/Main/Main';
import SearchForm from '../../components/SearchForm/SearchForm';
import ArticlesGrid from '../../components/ArticlesGrid/ArticlesGrid';

import './SearchPage.scss';
import './SearchPageTheme.scss';

const SearchPage = ({ search }) => {
  const filterOptions = [
    { id: 'popular', name: 'Popular' },
    { id: 'new', name: 'New' },
    { id: 'old', name: 'Old' },
  ];

  const [filterValue, setFilterValue] = useState('new');

  const articles = useSelector(selectArticles).filter(
    (article) => article.status === 'publish'
  );
  const tags = useSelector(selectTerms('post', 'tags'));
  const users = useSelector(selectUsers);

  let foundArticles = [];

  if (search.value.value) {
    if (search.value.area === 'tag') {
      const searchTagsIds = tags
        .filter((tag) =>
          tag.name.toLowerCase().includes(search.value.value.toLowerCase())
        )
        .map((tag) => tag.id);

      if (searchTagsIds) {
        foundArticles = articles.filter(
          (article) =>
            article.tags.filter((tagId) => searchTagsIds.includes(tagId))
              .length > 0
        );
      }
    } else if (search.value.area === 'post') {
      foundArticles = articles.filter(
        (article) =>
          article.title
            .toLowerCase()
            .includes(search.value.value.toLowerCase()) ||
          article.description
            .toLowerCase()
            .includes(search.value.value.toLowerCase())
      );
    } else if (search.value.area === 'author') {
      const searchUsersIds = users
        .filter((user) =>
          user.username.toLowerCase().includes(search.value.value.toLowerCase())
        )
        .map((user) => user.id);

      if (searchUsersIds) {
        foundArticles = articles.filter((article) =>
          searchUsersIds.includes(article.author)
        );
      }
    }
  }

  const body = (
    <div className="row row-16">
      <div className="col col-2 col-xl-1 col-lg-0"></div>

      <div className="main-body__content col col-12 col-xl-10 col-lg-12">
        <p className="page-search__title">Search</p>

        <SearchForm
          search={search}
          filter={{
            options: filterOptions,
            value: filterValue,
            setValue: setFilterValue,
          }}
        />

        <ArticlesGrid
          articles={foundArticles.sort((a, b) =>
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
        />
      </div>
    </div>
  );

  return <Main body={body} className="page-search" />;
};

export default SearchPage;
