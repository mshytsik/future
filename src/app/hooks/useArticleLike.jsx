import { useDispatch } from 'react-redux';
import { edit } from '../store/reducers/articlesReducer';
import { setDate } from '../utils/dateTime';

const useArticleLike = (article, user, isRemoveAction) => {
  const dispatch = useDispatch();

  return () => {
    const likeIds = isRemoveAction
      ? article.stats.liked.filter((like) => like.userId !== user.id)
      : [
          ...article.stats.liked,
          { userId: user.id, actionDate: setDate(Date.now()) },
        ];

    dispatch(
      edit({
        id: article.id,
        stats: { ...article.stats, liked: likeIds },
      })
    );
  };
};

export default useArticleLike;
