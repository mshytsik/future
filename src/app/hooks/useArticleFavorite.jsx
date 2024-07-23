import { useDispatch } from 'react-redux';
import { edit } from '../store/reducers/usersReducer';

const useArticleFavorite = (article, user, isRemoveAction) => {
  const dispatch = useDispatch();

  return () => {
    dispatch(
      edit({
        id: user.id,
        favorite: isRemoveAction
          ? user.favorite.filter((id) => id !== article.id)
          : [...user.favorite, article.id],
      })
    );
  };
};

export default useArticleFavorite;
