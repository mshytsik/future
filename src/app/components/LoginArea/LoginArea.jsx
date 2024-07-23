import { useSelector, useDispatch } from 'react-redux';
import { show, hide } from '../../store/reducers/popupReducer';
import {
  selectUsers,
  login,
  register,
} from '../../store/reducers/usersReducer';
import { socialLogin, socialRegister } from '../../services/socialLogin';
import { populateUser } from '../../utils/populate';
import { getNewId } from '../../utils/utils';

import { Button } from '../shared';

import googleIcon from '../../assets/img/icons/google.svg';
import facebookIcon from '../../assets/img/icons/facebook.svg';
import twitterIcon from '../../assets/img/icons/twitter.svg';
import vkontakteIcon from '../../assets/img/icons/vkontakte.svg';

import './LoginArea.scss';
import './LoginAreaTheme.scss';

const SOCIALS = [
  { name: 'Google', icon: googleIcon },
  { name: 'Facebook', icon: facebookIcon },
  { name: 'Twitter', icon: twitterIcon },
  { name: 'VKontakte', icon: vkontakteIcon },
];

const LoginArea = ({ type }) => {
  const dispatch = useDispatch();
  const dispatchShowPopup = (popupId) => dispatch(show(popupId));
  const dispatchRegisterUser = (user) => dispatch(register(user));

  const users = useSelector(selectUsers);

  const handleSocialLogin = async (socialName) => {
    let userId;

    if (type === 'login') {
      userId = await socialLogin(socialName);
    } else {
      const user = await socialRegister(socialName);
      userId = getNewId(users);

      dispatchRegisterUser({
        ...populateUser(),
        id: userId,
        nickname: user.email,
        username: user.username,
        email: user.email,
        password: user.password,
      });
    }

    dispatch(login(userId));
    dispatch(hide());
  };

  return (
    <div className="login-area">
      <div className="login-area__buttons">
        {SOCIALS.map((social) => (
          <div className="login-area__button" key={social.name}>
            <Button
              callback={() => handleSocialLogin(social.name)}
              title={social.name}
              icon={{ iconSrc: social.icon }}
              type="secondary"
              isFullWidth={true}
            />
          </div>
        ))}

        <div className="login-area__button">
          <Button
            callback={() => dispatchShowPopup(`${type}-email`)}
            title="Continue via email"
            type="secondary"
            isFullWidth={true}
          />
        </div>
      </div>

      <div className="login-area__note">
        <p>
          {type === 'login'
            ? "Don't have an account yet?"
            : 'Already have an account?'}{' '}
          <a
            onClick={() =>
              dispatchShowPopup(type === 'login' ? 'register' : 'login')
            }
            className="is-link"
          >
            {type === 'login' ? 'Register' : 'Login'}
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginArea;
