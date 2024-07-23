import { Link } from 'react-router-dom';

import './Breadcrumbs.scss';
import './BreadcrumbsTheme.scss';

const Breadcrumbs = ({ items }) => {
  const itemsWithMain = [{ link: '/', name: 'Homepage' }, ...items];

  return (
    <ul className="breadcrumbs">
      {itemsWithMain.map((item, index) => (
        <li key={index} className="breadcrumbs__item">
          {index < itemsWithMain.length - 1 ? (
            <Link to={item.link}>
              <span>{item.name}</span>
            </Link>
          ) : (
            <p>
              <span>{item.name}</span>
            </p>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Breadcrumbs;
