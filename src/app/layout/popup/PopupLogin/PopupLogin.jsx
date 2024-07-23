import { Link } from 'react-router-dom';

import Popup from '../Popup/Popup';
import LoginArea from '../../../components/LoginArea/LoginArea';

const PopupLogin = ({ isActive }) => {
  const title = (
    <>
      Login
      <br />
      to your account
    </>
  );

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

  return (
    <Popup isActive={isActive} size="sm" head={{ title, subtitle }}>
      <LoginArea type="login" />
    </Popup>
  );
};

export default PopupLogin;
