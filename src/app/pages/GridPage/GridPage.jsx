import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectArticles,
  selectTermBySlug,
} from '../../store/reducers/articlesReducer';
import { selectCurrentUser } from '../../store/reducers/usersReducer';
import { show } from '../../store/reducers/popupReducer';

import ErrorPage from '../ErrorPage/ErrorPage';
import Titlearea from '../../components/Titlearea/Titlearea';
import EmptyGridBlock from '../../components/EmptyGridBlock/EmptyGridBlock';
import ArticlesGrid from '../../components/ArticlesGrid/ArticlesGrid';
import Main from '../../layout/main/Main/Main';

import './GridPage.scss';

const GridPage = ({ type }) => {
  const { term, slug } = useParams();
  const currentTerm = useSelector(
    selectTermBySlug(slug, type, term === 'tag' ? 'tags' : 'categories')
  );

  if (!currentTerm) {
    return <ErrorPage />;
  }

  const articles = useSelector(selectArticles).filter((article) => {
    const hasTerm =
      term === 'tag'
        ? article.tags.includes(currentTerm.id)
        : article.category === currentTerm.id;
    return article.type === type && article.status === 'publish' && hasTerm;
  });

  const currentUser = useSelector(selectCurrentUser);

  const dispatch = useDispatch();
  const dispatchShowPopup = (popupId) => dispatch(show(popupId));

  const body = (
    <div className="row row-16">
      <div className="col col-2 col-xl-1 col-lg-0"></div>

      <div className="main-body__content col col-12 col-xl-10 col-lg-12">
        <Titlearea
          breadcrumbs={[{ name: currentTerm.name }]}
          title={currentTerm.name}
          isHash={term === 'tag'}
        />

        {articles.length ? (
          <ArticlesGrid
            articles={articles}
            isBlocks={type === 'post' && currentTerm.slug === 'knowledge-base'}
          />
        ) : (
          <EmptyGridBlock
            title={`There are no ${
              type === 'post' ? 'posts' : 'conferences'
            } here yet`}
            subtitle={`Become the first author in this section`}
            callback={() =>
              dispatchShowPopup(currentUser ? 'buttons' : 'login')
            }
          />
        )}
      </div>

      <div className="col col-2 col-xl-1 col-lg-0"></div>
    </div>
  );

  return <Main body={body} className="page-grid" />;
};

export default GridPage;
