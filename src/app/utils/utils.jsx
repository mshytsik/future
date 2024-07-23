// usage: getDeclination(5,'комментари|й|я|ев')
// usage: getDeclination(5,'participant||s|s')
export const getDeclination = (number, words) => {
  const w = words.split('|');
  const n = Math.abs(number * 1);
  return n % 10 == 1 && n % 100 != 11
    ? w[0] + w[1]
    : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
      ? w[0] + w[2]
      : w[0] + w[3];
};

export const getNewId = (dataArray) => {
  return dataArray.length > 0
    ? Math.max(...dataArray.map((item) => item.id)) + 1
    : 1;
};

export const getNewSlug = (name, dataArray) => {
  const slugBase = name.toLowerCase().replace(/\s+/g, '-');

  let newSlug = slugBase;
  let slugRepeats = 0;
  while (dataArray.find((item) => item.slug === newSlug)) {
    slugRepeats++;
    newSlug = `${slugBase}-${slugRepeats}`;

    if (slugRepeats === 100) {
      newSlug = false;
      break;
    }
  }

  return newSlug;
};

export const errorHandler = (errors, errorName = '') => {
  let errorElements = errorName
    ? document.getElementsByName(errorName)
    : Object.keys(errors).map((name) => document.getElementsByName(name)[0]);

  if (errorElements.length) {
    let errorElement = errorElements[0];
    errorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};

export const calculateUserRating = (userArticles) => {
  const ARTICLES_AMOUNT_COEFF = 15.234567;
  const ARTICLES_LIKES_COEFF = 5.234567;

  const result =
    ARTICLES_AMOUNT_COEFF * userArticles.length +
    ARTICLES_LIKES_COEFF *
      userArticles.reduce(
        (sum, article) => sum + article.stats.liked.length,
        0
      );

  return result.toFixed(2);
};
