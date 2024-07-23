import './ProfileBlock.scss';
import './ProfileBlockTheme.scss';

const ProfileBlock = ({
  title = '',
  value = '',
  className = '',
  isRating = false,
  reorder = false,
  children = null,
}) => {
  return (
    <div className={`profile-block ${className}`}>
      {!reorder && <p className="profile-block__title">{title}</p>}

      {children ?? (
        <div
          className={`profile-block__value ${
            isRating ? 'profile-block__value--rating' : ''
          }`}
        >
          {value
            .toString()
            .split('\n')
            .map((line, index) => (
              <p key={index}>{line}</p>
            ))}
        </div>
      )}

      {reorder && <p className="profile-block__title">{title}</p>}
    </div>
  );
};

export default ProfileBlock;
