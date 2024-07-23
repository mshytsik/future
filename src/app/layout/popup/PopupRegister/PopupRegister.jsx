import { Link } from 'react-router-dom';

import Popup from '../Popup/Popup';
import LoginArea from '../../../components/LoginArea/LoginArea';

import company from '../../../data/company';

const PopupRegister = ({ isActive }) => {
  const title = 'Create an account';

  const subtitle = (
    <>
      By continuing, you agree to{' '}
      <Link to="#" className="is-link">
        our terms of use
      </Link>{' '}
      and{' '}
      <Link to="#" className="is-link">
        privacy policy
      </Link>
    </>
  );

  const footer = (
    <p>
      Do you represent the interests of the company?
      <br />
      <Link to={`mailto:${company.email.default}`}>
        Write to us by email {company.email.default}
      </Link>
      <br />
      and get additional features
    </p>
  );

  return (
    <Popup
      isActive={isActive}
      size="sm"
      head={{
        title,
        subtitle,
      }}
      footer={footer}
    >
      <LoginArea type="register" />
    </Popup>
  );
};

export default PopupRegister;
