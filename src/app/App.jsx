import { useState, createContext, useEffect } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectActivePopup, hide } from './store/reducers/popupReducer';
import { selectUsersState } from './store/reducers/usersReducer';
import { selectArticlesState } from './store/reducers/articlesReducer';
import { updateStorageData } from './utils/localStorage';

import Header from './layout/header/Header/Header';
import Homepage from './pages/Homepage/Homepage';
import Conferences from './pages/Conferences/Conferences';
import GridPage from './pages/GridPage/GridPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import SearchPage from './pages/SearchPage/SearchPage';
import ArticlePage from './pages/ArticlePage/ArticlePage';
import PostEditor from './pages/PostEditor/PostEditor';
import ConferenceEditor from './pages/ConferenceEditor/ConferenceEditor';

import ToastList from './layout/toast/ToastList/ToastList';
import PopupList from './layout/popup/PopupList/PopupList';

import './App.scss';

export const ThemeContext = createContext('light');

const App = () => {
  const getInitialTheme = () => {
    const currentHours = new Date(Date.now()).getHours();
    return currentHours >= 8 && currentHours < 20 ? 'light' : 'dark';
  };

  const [theme, setTheme] = useState(getInitialTheme());

  const activePopup = useSelector(selectActivePopup);

  const [search, setSearch] = useState({ value: '', area: 'tag' });

  const dispatch = useDispatch();

  const location = useLocation();
  useEffect(() => {
    activePopup.id && dispatch(hide());
  }, [location.pathname]);

  const usersState = useSelector(selectUsersState);
  useEffect(() => {
    updateStorageData('users', usersState);
  }, [usersState]);

  const articlesState = useSelector(selectArticlesState);
  useEffect(() => {
    updateStorageData('articles', articlesState);
  }, [articlesState]);

  return (
    <ThemeContext.Provider value={theme}>
      <div
        className={`body is-${theme}-mode ${activePopup.id ? 'no-scroll' : ''}`}
      >
        <Header setTheme={setTheme} />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/conferences" element={<Conferences />} />

          <Route path="/posts/:term/:slug" element={<GridPage type="post" />} />
          <Route
            path="/conferences/:term/:slug"
            element={<GridPage type="conference" />}
          />

          <Route path="/:type/:id" element={<ArticlePage />} />

          <Route
            path="/add/post"
            element={<PostEditor activePopup={activePopup.id} key="add" />}
          />
          <Route
            path="/post/:id/edit"
            key="edit"
            element={<PostEditor activePopup={activePopup.id} editMode />}
          />

          <Route
            path="/add/conference"
            element={<ConferenceEditor key="add" />}
          />
          <Route
            path="/conference/:id/edit"
            key="edit"
            element={<ConferenceEditor editMode />}
          />

          <Route
            path="/add/conference"
            element={<ConferenceEditor activePopup={activePopup.id} />}
          />

          <Route
            path="/author/:nickname"
            element={<ProfilePage activePopup={activePopup.id} />}
          />

          <Route
            path="/search"
            element={
              <SearchPage search={{ value: search, setter: setSearch }} />
            }
          />

          <Route path="*" element={<ErrorPage />} />
        </Routes>

        <PopupList
          active={activePopup}
          search={{ value: search, setter: setSearch }}
        />

        <ToastList />
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
