import { createSlice, createSelector } from '@reduxjs/toolkit';
import { getStorageArticles } from '../../utils/localStorage';

import articles from '../../mocks/articles';
import articleBlocks from '../../mocks/articleBlocks';
import categories from '../../mocks/categories';
import tags from '../../mocks/tags';

const initialState = getStorageArticles() ?? {
  list: articles.map((article) => ({
    ...article,
    editorBlocks: articleBlocks,
  })),
  post: {
    categories: [
      {
        id: 0,
        slug: 'knowledge-base',
        name: 'Knowledge base',
      },
      ...categories,
    ],
    tags,
  },
  conference: { categories, tags },
};

const selectSelf = (state) => state;

export const selectArticlesState = createSelector(
  selectSelf,
  (state) => state.articles
);

export const selectArticles = createSelector(selectSelf, (state) =>
  [...state.articles.list].sort(
    (a, b) =>
      Date.parse(b.type === 'post' ? b.dateTime : b.dateTime.start) -
      Date.parse(a.type === 'post' ? a.dateTime : a.dateTime.start)
  )
);

export const selectArticle = (id) =>
  createSelector(selectSelf, (state) =>
    state.articles.list.find((article) => article.id === id)
  );

export const selectTerms = (type, term) =>
  createSelector(selectSelf, (state) => state.articles[type][term]);

export const selectTerm = (id, type, term) =>
  createSelector(selectSelf, (state) =>
    state.articles[type][term].find((term) => term.id === id)
  );

export const selectTermBySlug = (slug, type, term) =>
  createSelector(selectSelf, (state) =>
    state.articles[type][term].find((term) => term.slug === slug)
  );

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    add: (state, action) => {
      state.list = [...state.list, action.payload];
    },
    edit: (state, action) => {
      state.list = state.list.map((article) =>
        article.id === action.payload.id
          ? { ...article, ...action.payload }
          : article
      );
    },
    remove: (state, action) => {
      state.list = state.list.filter(
        (article) => article.id !== action.payload
      );
    },
    addTerms: (state, action) => {
      state[action.payload.type][action.payload.term] = [
        ...state[action.payload.type][action.payload.term],
        ...action.payload.data.map((term) => ({
          id: term.id,
          slug: term.slug,
          name: term.name,
        })),
      ];
    },
    removeTerm: (state, action) => {
      state[action.payload.type][action.payload.term] = state[
        action.payload.type
      ][action.payload.term].filter((term) => term.id !== action.payload.id);
    },
  },
});

export const { add, edit, remove, addTerms, removeTerm } =
  articlesSlice.actions;

export default articlesSlice.reducer;
