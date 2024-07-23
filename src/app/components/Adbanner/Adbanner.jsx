import { Link } from 'react-router-dom';

import './Adbanner.scss';

const Adbanner = ({ link = null, imageSrc = null, className = '' }) => {
  return link ? (
    <Link
      to={link}
      className={`adbanner ${className}`}
      target="_blank"
      rel="noreferrer"
    >
      {imageSrc && <img src={imageSrc} />}
    </Link>
  ) : (
    <div className={`adbanner ${className}`}>
      {imageSrc && <img src={imageSrc} />}
    </div>
  );
};

export default Adbanner;
