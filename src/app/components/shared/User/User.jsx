import { Fragment } from 'react';
import verifyIcon from '../../../assets/img/icons/verify.svg';
import loginIcon from '../../../assets/img/icons/login.svg';

import './User.scss';
import './UserTheme.scss';

const User = ({
  user = {},
  title,
  splitTitle = false,
  subtitle = null,
  photoOnly = false,
  callback = null,
  subtitleCallback = null,
  verifyNearTitle = false,
  meta = [],
  className = '',
}) => {
  const isUnknown = !user.photo && !user.username;

  let outputTitle = title ?? user.username;

  const verifyBlock = user.isVerified && (
    <img className="user__verify" src={verifyIcon} />
  );

  const handleSubtitleClick = (e) => {
    e.stopPropagation();
    subtitleCallback?.();
  };

  return (
    <div className={`user ${className}`} onClick={callback}>
      <div className={`user__photo ${isUnknown ? 'is-unknown' : ''}`}>
        {!isUnknown &&
          (user.photo ? (
            <img src={user.photo} />
          ) : (
            <p>
              {user.username
                .split(' ')
                .map((item) => item[0])
                .join('')}
            </p>
          ))}

        {isUnknown && <img src={loginIcon} />}
      </div>

      {!photoOnly && (
        <>
          <div className="user__content">
            {outputTitle !== '' && (
              <div className="user__title">
                <p>
                  {splitTitle
                    ? outputTitle.split(' ').map((line, index) => (
                        <Fragment key={index}>
                          {line}
                          <br />
                        </Fragment>
                      ))
                    : outputTitle}
                </p>

                {verifyNearTitle && verifyBlock}
              </div>
            )}

            {subtitle && (
              <p
                className={`user__subtitle ${
                  subtitleCallback ? 'is-link' : ''
                }`}
                onClick={
                  subtitleCallback ? (e) => handleSubtitleClick(e) : null
                }
              >
                {subtitle}
              </p>
            )}

            {meta.length > 0 && (
              <div className="user__meta">
                {meta.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            )}
          </div>

          {!verifyNearTitle && verifyBlock}
        </>
      )}
    </div>
  );
};

export default User;
