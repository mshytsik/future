import { useContext } from 'react';
import { ThemeContext } from '../../App';

import chevronIcon from '../../assets/img/icons/chevron-l-dark.svg';
import chevronIconDark from '../../assets/img/icons/chevron-l-light.svg';

const ProfileEditorSection = ({
  id,
  isActive,
  section,
  setShowHead,
  sectionRef = null,
  children,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <div
      id={id}
      className={`pe-form__area hide-scroll ${isActive ? 'is-active' : ''}`}
      name={section.id}
      ref={sectionRef}
    >
      <div className="pe-form__title">
        <img
          src={theme === 'light' ? chevronIcon : chevronIconDark}
          onClick={() => setShowHead(true)}
        />
        <p>{section.title}</p>
      </div>

      {children}
    </div>
  );
};

export default ProfileEditorSection;
