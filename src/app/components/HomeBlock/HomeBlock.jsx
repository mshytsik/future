import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../App';
import { getRandomColorName } from '../../utils/random';

import Article from '../Article/Article';
import GridBlock from '../GridBlock/GridBlock';
import { Button } from '../shared';

import arrow from '../../assets/img/icons/arrow-r.svg';
import arrowDark from '../../assets/img/icons/theme/arrow-r.svg';
import chevron from '../../assets/img/icons/chevron-d.svg';
import chevronDark from '../../assets/img/icons/theme/chevron-d.svg';

import './HomeBlock.scss';
import './HomeBlockTheme.scss';

const HomeBlock = ({
  category,
  isGridBlock = true,
  articles,
  className = '',
}) => {
  const theme = useContext(ThemeContext);

  const navigate = useNavigate();

  return (
    <div className={`home-block ${className}`}>
      <div className="home-block__head">
        <div className="home-block__title home-title">
          <div className={`home-title__icon color--${getRandomColorName()}`}>
            <p>{category.name[0]}</p>
          </div>
          <p className="home-title__value">{category.name}</p>
        </div>

        <Button
          callback={() => navigate(`/posts/category/${category.slug}`)}
          title="See all"
          icon={{ iconSrc: theme === 'light' ? arrow : arrowDark }}
          type="secondary"
        />
      </div>

      {isGridBlock ? (
        <GridBlock articles={articles} isHomeBlock />
      ) : (
        <div className="row">
          {articles.map((article, index) => (
            <div
              key={article.id}
              className={`col col-3 col-md-4 col-sm-12 ${
                index < 3 ? '' : 'hide-sm'
              }`}
            >
              <Article
                types={
                  index === 0
                    ? 'small-xl small-lg small-md small-sm large-xs'
                    : 'small'
                }
                article={article}
              />
            </div>
          ))}
        </div>
      )}

      <div className="home-block__footer hide-xl hide-lg hide-md hide-sm">
        <Button
          callback={() => navigate(`/posts/category/${category.slug}`)}
          title="See all"
          icon={{ iconSrc: theme === 'light' ? chevron : chevronDark }}
          type="secondary"
          isFullWidth={true}
        >
          <img src={theme === 'light' ? chevron : chevronDark} />
        </Button>
      </div>
    </div>
  );
};

export default HomeBlock;
