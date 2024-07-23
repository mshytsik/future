import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../App';

import Main from '../../layout/main/Main/Main';
import { Button } from '../../components/shared';

import errorIcon from '../../assets/img/images/404.svg';
import errorIconDark from '../../assets/img/images/theme/404.svg';

import './ErrorPage.scss';
import './ErrorPageTheme.scss';

const ErrorPage = () => {
  const theme = useContext(ThemeContext);

  const navigate = useNavigate();

  const body = (
    <div className="row row-16">
      <div className="main-body__content col col-6 col-xl-12">
        <div className="page-404__content">
          <div className="page-404__image">
            <img src={theme === 'light' ? errorIcon : errorIconDark} />
          </div>

          <div className="page-404__info">
            <p className="page-404__title">Error 404</p>

            <p className="page-404__subtitle">
              Whoops! The page you are trying to access was not found.
            </p>

            <Button
              callback={() => navigate(`/`)}
              title="Back to homepage"
              type="primary"
              size="md"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return <Main body={body} className="page-404" />;
};

export default ErrorPage;
