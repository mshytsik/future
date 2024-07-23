import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import {
  selectArticles,
  selectTerms,
} from '../../store/reducers/articlesReducer';
import {
  selectCurrentUser,
  selectUsers,
} from '../../store/reducers/usersReducer';
import { getTermArticles } from '../../utils/articles';
import { calculateUserRating } from '../../utils/utils';

import Main from '../../layout/main/Main/Main';
import {
  Markets,
  Leaders,
  Adbanner,
  PageBlock,
  HomeBlock,
  TagsGrid,
  ShortNews,
  Article,
} from '../../components';

import wideAdBanner from '../../assets/img/images/adbanner-1.jpg';
import narrowAdBanner from '../../assets/img/images/adbanner-2.jpg';

import './Homepage.scss';

const Homepage = () => {
  const articles = useSelector(selectArticles).filter(
    (article) => article.type === 'post' && article.status === 'publish'
  );

  const categories = useSelector(selectTerms('post', 'categories')).filter(
    (category) => category.slug !== 'knowledge-base'
  );
  const tags = useSelector(selectTerms('post', 'tags'));

  const user = useSelector(selectCurrentUser);
  const users = useSelector(selectUsers);

  const bookmarks = (
    user?.bookmarks.length
      ? user.bookmarks
          .filter((bookmark) => bookmark.active)
          .map((bookmark) =>
            categories.find((category) => category.id === bookmark.id)
          )
      : categories
  ).map((category) => ({
    category,
    articles: getTermArticles(articles, 'post', 'category', category.id),
  }));

  const getUserArticles = (user) => {
    return useSelector(selectArticles).filter(
      (article) => article.author === user.id && article.status === 'publish'
    );
  };

  const leaders = users
    .map((user) => ({
      ...user,
      rating: calculateUserRating(getUserArticles(user)),
    }))
    .filter((user) => user.rating > 0)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);

  const body = (
    <>
      <Markets />

      <div className="row row-16">
        <div className="main-body__content col col-12 col-xl-9 col-lg-12">
          <div className="top-block row">
            <div className="col col-8 col-md-12">
              <Article types="large" article={articles[0]} />
            </div>

            <div className="col col-4 col-md-12">
              <div className="top-block__shorts row">
                {articles.slice(1, 6).map((article) => (
                  <div
                    key={article.id}
                    className="col col-12 col-md-6 col-sm-12"
                  >
                    <Article types="short" article={article} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Adbanner
            link="#"
            imageSrc={wideAdBanner}
            className="hide-xl hide-lg"
          />

          <PageBlock title="Leaderboard" className="hide-xl hide-lg">
            <Leaders leaders={leaders} className="hide-scroll" />
          </PageBlock>

          {bookmarks
            .filter((bookmark) => bookmark.articles.length > 0)
            .map((bookmark, index) => (
              <Fragment key={bookmark.category.id}>
                <HomeBlock
                  category={bookmark.category}
                  isGridBlock={index % 2 === 0}
                  articles={bookmark.articles.slice(0, index % 2 ? 4 : 5)}
                  className="page-home__block"
                />

                {index === 0 && <Adbanner link="#" imageSrc={wideAdBanner} />}

                {index === 1 && (
                  <PageBlock title="Hot news" className="hide-xl hide-lg">
                    <ShortNews
                      articles={articles.slice(0, 4)}
                      className="hide-scroll"
                    />
                  </PageBlock>
                )}
              </Fragment>
            ))}
        </div>

        <div className="main-body__sidebar col col-4 col-xl-3">
          <PageBlock title="Leaderboard">
            <Leaders leaders={leaders} />
          </PageBlock>

          <Adbanner link="#" imageSrc={narrowAdBanner} />

          <PageBlock title="Hot news">
            <ShortNews articles={articles.slice(0, 4)} />
          </PageBlock>

          <PageBlock title="Recommended topics">
            <TagsGrid tags={tags.slice(0, 5)} />
          </PageBlock>
        </div>
      </div>
    </>
  );

  return <Main body={body} className="page-home" />;
};

export default Homepage;
