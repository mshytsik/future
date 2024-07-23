import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../App';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectArticles,
  add,
  remove,
} from '../../store/reducers/articlesReducer';
import { selectCurrentUser, edit } from '../../store/reducers/usersReducer';
import { getNewId } from '../../utils/utils';
import { setDate } from '../../utils/dateTime';
import { useToast } from '../../hooks';

import { Button, Dropdown } from '../shared';

import chevronLeftIcon from '../../assets/img/icons/chevron-l-dark.svg';
import chevronLeftIconDark from '../../assets/img/icons/theme/chevron-l-dark.svg';
import chevronDownIcon from '../../assets/img/icons/chevron-d.svg';
import chevronDownIconDark from '../../assets/img/icons/theme/chevron-d.svg';
import favoriteIcon from '../../assets/img/icons/favorite-black.svg';
import favoriteIconDark from '../../assets/img/icons/theme/favorite-black.svg';
import eyeOn from '../../assets/img/icons/eye-black.svg';
import eyeOnDark from '../../assets/img/icons/theme/eye-black.svg';
import eyeOff from '../../assets/img/icons/eye-off-black.svg';
import eyeOffDark from '../../assets/img/icons/theme/eye-off-black.svg';

import './ArticleEditorNav.scss';
import './ArticleEditorNavTheme.scss';

const ArticleEditorNav = ({
  article,
  user,
  isPreviewMode,
  previewCallback,
  saveDraftCallback,
  editMode = false,
}) => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const theme = useContext(ThemeContext);

  const eyeIcon = isPreviewMode ? eyeOff : eyeOn;
  const eyeIconDark = isPreviewMode ? eyeOffDark : eyeOnDark;

  const dispatch = useDispatch();

  const removeArticle = () => {
    dispatch(remove(Number(article.id)));
    navigate(
      `/author/${user.nickname}#${
        article.type === 'post' ? 'posts' : 'conferences'
      }`
    );
  };

  const toast = useToast();

  const handleRemove = () => {
    if (editMode) {
      toast({
        type: 'warning',
        title: 'Are you sure?',
        message: 'This action would not be cancelled.',
        buttons: [{ name: 'Yes', callback: removeArticle }, { name: 'No' }],
      });
    }
  };

  const articles = useSelector(selectArticles);
  const currentUser = useSelector(selectCurrentUser);

  const handleDuplicate = () => {
    if (editMode) {
      const articleCopyId = getNewId(articles);
      const articleCopy = {
        ...article,
        id: articleCopyId,
        status: 'draft',
      };

      if (article.type === 'post') {
        articleCopy.dateTime = setDate(Date.now());
      }

      dispatch(add(articleCopy));
      if (currentUser.favorite.includes(article.id)) {
        dispatch(
          edit({
            id: currentUser.id,
            favorite: [...currentUser.favorite, articleCopyId],
          })
        );
      }
      navigate(`/author/${user.nickname}#draft`);
    }
  };

  return (
    <div className="editor-nav">
      <div className="editor-nav__block">
        <Button
          callback={() => navigate('/')}
          title="To homepage"
          icon={{
            iconSrc: theme === 'light' ? chevronLeftIcon : chevronLeftIconDark,
          }}
          type="secondary"
          size="md"
          isSquare
          className="editor-nav__back"
        />
      </div>

      <div className="editor-nav__block">
        <div className="editor-nav__title nav-title">
          <Button
            callback={() => setShowMenu((show) => !show)}
            title={article.title ? article.title : 'Untitled'}
            icon={{
              iconSrc: editMode
                ? theme === 'light'
                  ? chevronDownIcon
                  : chevronDownIconDark
                : null,
            }}
            type="secondary"
            size="md"
            className={`nav-title__button ${editMode ? '' : 'is-disabled'}`}
          />

          {editMode && (
            <Dropdown
              items={[
                { name: 'Duplicate', callback: handleDuplicate },
                { name: 'Remove', callback: handleRemove },
              ]}
              isActive={showMenu}
              setIsActive={setShowMenu}
              togglerSelector=".nav-title__button"
              className="nav-title__menu"
            />
          )}
        </div>
      </div>

      <div className="editor-nav__block">
        <Button
          callback={previewCallback}
          icon={{
            iconSrc: theme === 'light' ? eyeIcon : eyeIconDark,
            iconOnly: true,
            iconSize: 'md',
          }}
          type="secondary"
          className="editor-nav__preview"
        />

        <Button
          callback={saveDraftCallback}
          title="Save as draft"
          icon={{
            iconSrc: theme === 'light' ? favoriteIcon : favoriteIconDark,
          }}
          type="secondary"
          size="md"
          className="editor-nav__save"
        />
      </div>
    </div>
  );
};

export default ArticleEditorNav;
