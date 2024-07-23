import { useNavigate } from 'react-router-dom';
import { useOnResize } from '../../hooks';

import { Button } from '../shared';

import chevron from '../../assets/img/icons/chevron-r.svg';
import stars from '../../assets/img/icons/stars.svg';

import './ProfileEditorHead.scss';
import './ProfileEditorHeadTheme.scss';

import company from '../../data/company';

const ProfileEditorHead = ({ sections, user, setActiveSection, className }) => {
  const navigate = useNavigate();

  useOnResize(() => setActiveSection(''));

  return (
    <div className={`pe-head ${className}`}>
      <div className="pe-head__content">
        <p className="pe-head__title">Profile:</p>

        <div className="pe-head__nav">
          {sections.map((section) => (
            <div
              key={section.id}
              className="pe-head__button"
              onClick={() => setActiveSection(section.id)}
            >
              <p>{section.title}</p>
              <img src={chevron} />
            </div>
          ))}
        </div>
      </div>

      {user.type !== 'company' && (
        <div className="pe-head__banner pe-banner">
          <img className="pe-banner__icon" src={stars} />
          <p className="pe-banner__title">
            Do you represent the interests of the company?
          </p>
          <p className="pe-banner__subtitle">
            Create a corporate account and get additional features
          </p>

          <Button
            callback={() => navigate(`mailto:${company.email.default}`)}
            title="Learn more"
            type="secondary"
            size="md"
            isFullWidth
          />
        </div>
      )}
    </div>
  );
};

export default ProfileEditorHead;
