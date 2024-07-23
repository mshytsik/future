import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectArticles,
  selectArticle,
  selectTermBySlug,
} from '../../store/reducers/articlesReducer';
import {
  selectUser,
  selectCurrentUser,
} from '../../store/reducers/usersReducer';
import { randomizeArray } from '../../utils/random';

import PageArticleHeader from '../../components/PageArticleHeader/PageArticleHeader';
import PageArticleFooter from '../../components/PageArticleFooter/PageArticleFooter';
import PageArticleContents from '../../components/PageArticleContents/PageArticleContents';
import Article from '../../components/Article/Article';
import Support from '../../components/Support/Support';
import Editor from '../../components/editor/Editor/Editor';
import ErrorPage from '../ErrorPage/ErrorPage';
import Main from '../../layout/main/Main/Main';

import './ArticlePage.scss';
import './ArticlePageTheme.scss';

const ArticlePage = () => {
  const { type, id } = useParams();
  const article = useSelector(selectArticle(Number(id)));

  if (!article || article.type !== type) {
    return <ErrorPage />;
  }

  const author = useSelector(selectUser(article.author));
  const currentUser = useSelector(selectCurrentUser);

  if (
    !currentUser?.isModerator &&
    currentUser?.id !== author.id &&
    article.status !== 'publish'
  ) {
    return <ErrorPage />;
  }

  const knowledgeBase = useSelector(
    selectTermBySlug('knowledge-base', 'post', 'categories')
  );
  const isKnowledgeArticle = article.category === knowledgeBase.id;

  let contentsItems = [];
  article.editorBlocks.forEach((block, index) => {
    if (block.type === 'heading' && block.size === 'h2') {
      contentsItems.push({
        title: block.value,
        target: `editor-${block.type}-${index}`,
      });
    }
  });

  const articles = useSelector(selectArticles).filter(
    (item) => item.type === article.type && item.id !== article.id
  );
  const [relatedArticlesIds, setRelatedArticlesIds] = useState([]);

  useEffect(() => {
    let relatedArticles = randomizeArray(articles)
      .filter((item) => item.category === article.category)
      .slice(0, 2);

    if (relatedArticles.length < 2) {
      let randomArticles = randomizeArray(
        articles.filter((item) => item.category !== article.category)
      ).slice(0, 2 - relatedArticles.length);

      relatedArticles = [...relatedArticles, ...randomArticles];
    }

    setRelatedArticlesIds(relatedArticles.map((item) => item.id));
  }, [id]);

  const body = (
    <div className="row row-16">
      <div className="col col-4 col-xl-2 col-lg-0"></div>

      <div className="main-body__content col col-8 col-lg-12">
        <PageArticleHeader
          article={article}
          isKnowledgeArticle={isKnowledgeArticle}
        />

        {isKnowledgeArticle && contentsItems.length > 0 && (
          <PageArticleContents items={contentsItems} className="hide-xl" />
        )}

        <Editor articleData={article} className="page-article__body" />

        <PageArticleFooter article={article} />

        {article.type === 'post' ? (
          relatedArticlesIds.length && (
            <div className="pa-related">
              <p className="pa-related__title">Read more</p>

              <div className="row">
                {articles
                  .filter((item) => relatedArticlesIds.includes(item.id))
                  .map((item) => (
                    <div key={item.id} className="col col-6 col-sm-12">
                      <Article article={item} types="large-xs" />
                    </div>
                  ))}
              </div>
            </div>
          )
        ) : (
          <Support className="page-article__support" />
        )}
      </div>

      <div className="col col-4 col-xl-2 col-lg-0">
        {isKnowledgeArticle && (
          <PageArticleContents
            items={contentsItems}
            className="hide-lg hide-md hide-sm hide-xs"
          />
        )}
      </div>
    </div>
  );

  return (
    <Main
      body={body}
      className={`page-article ${
        article.type === 'conference' ? 'page-article--conference' : ''
      }`}
    />
  );
};

export default ArticlePage;
