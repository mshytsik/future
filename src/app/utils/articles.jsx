export const sanitizeEditorBlocks = (blocks) => {
  return blocks
    .filter((block) => !(block.type == 'text' && block.value === ''))
    .map((block) => {
      delete block.id;
      delete block.valid;
      delete block.chosen;
      delete block.selected;
      return block;
    });
};

export const getTermArticles = (articles, type, term, termId) => {
  return articles.filter(
    (article) =>
      article.type === type &&
      (term === 'tags'
        ? article.tags.includes(termId)
        : article.category === termId)
  );
};

export const getTermAuthors = (articles, type, term, termId) => {
  const termArticles = getTermArticles(articles, type, term, termId);
  const termAuthors = new Set(termArticles.map((article) => article.author));

  return Array.from(termAuthors);
};
