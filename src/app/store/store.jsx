import { configureStore } from '@reduxjs/toolkit';

import usersReducer from './reducers/usersReducer';
import articlesReducer from './reducers/articlesReducer';
import popupReducer from './reducers/popupReducer';
import toastsReducer from './reducers/toastsReducer';
import marketsReducer from './reducers/marketsReducer';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    articles: articlesReducer,
    popup: popupReducer,
    toasts: toastsReducer,
    markets: marketsReducer,
  },
});
