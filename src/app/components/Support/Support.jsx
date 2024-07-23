import { Link } from 'react-router-dom';

import tgIcon from '../../assets/img/icons/tg.svg';
import fbIcon from '../../assets/img/icons/fb.svg';
import igIcon from '../../assets/img/icons/ig.svg';
import vkIcon from '../../assets/img/icons/vk.svg';
import inIcon from '../../assets/img/icons/in.svg';

import './Support.scss';
import './SupportTheme.scss';

import company from '../../data/company';

const Support = ({ className = '' }) => {
  const SOCIAL_ICONS = {
    telegram: tgIcon,
    facebook: fbIcon,
    instagram: igIcon,
    vkontakte: vkIcon,
    linkedin: inIcon,
  };

  return (
    <div className={`support ${className}`}>
      <p className="support__title">Are there any difficulties?</p>

      <div className="support__body">
        <p className="support__description">
          You can contact our technical support team at the following contact
          details.
        </p>

        <div className="support__row">
          <SupportBlock
            title="Email"
            value={company.email.default}
            link={`mailto:${company.email.default}`}
          />

          <SupportBlock
            title="Phone"
            value="+370 (649) 000-00"
            link="tel:+37064900000"
          />
        </div>

        <div className="support__row">
          <SupportBlock title="Location" value="Lithuania, Vilnius" />

          <div className="support__socials">
            {Object.entries(company.socials).map(
              ([name, link]) =>
                name !== 'tiktok' && (
                  <Link key={name} to={link} target="_blank" rel="nofollow">
                    <img src={SOCIAL_ICONS[name]} />
                  </Link>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SupportBlock = ({ title, value, link = '' }) => {
  return (
    <div className="support-block">
      {title && <p className="support-block__title">{title}</p>}

      {link ? (
        <Link to={link} className="support-block__value">
          {value}
        </Link>
      ) : (
        <p className="support-block__value">{value}</p>
      )}
    </div>
  );
};

export default Support;
