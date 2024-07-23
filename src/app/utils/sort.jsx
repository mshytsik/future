import { getTermArticles } from './articles';

export const sortArticles = (a, b, orderby, order = 'desc') => {
  if (orderby === 'date') {
    const aDatetime = new Date(
      a.type === 'post' ? a.dateTime : a.dateTime.start
    );
    const bDatetime = new Date(
      b.type === 'post' ? b.dateTime : b.dateTime.start
    );

    return order === 'desc' ? bDatetime - aDatetime : aDatetime - bDatetime;
  } else if (orderby === 'popular') {
    const aLikes = a.stats.liked.length;
    const bLikes = b.stats.liked.length;

    return order === 'desc' ? bLikes - aLikes : aLikes - bLikes;
  }

  return true;
};

export const sortTerms = (
  a,
  b,
  type,
  term,
  articles = [],
  orderby = 'articles',
  order = 'desc'
) => {
  if (orderby === 'articles') {
    const aArticles = getTermArticles(articles, type, term, a.id).length;
    const bArticles = getTermArticles(articles, type, term, b.id).length;

    return order === 'desc' ? bArticles - aArticles : aArticles - bArticles;
  }

  return true;
};
