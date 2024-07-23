import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, edit } from '../../store/reducers/usersReducer';
import { loadImageFile } from '../../utils/image';

import { Button } from '../shared';

import './ProfileCover.scss';

import imageIcon from '../../assets/img/icons/image.svg';
import trashIcon from '../../assets/img/icons/trash-w.svg';

const ProfileCover = ({ user }) => {
  const currentUser = useSelector(selectCurrentUser);
  const isCurrentUser = user.id === currentUser?.id;

  const [cover, setCover] = useState(user.profileCover);

  const dispatch = useDispatch();

  const handleChange = (e) =>
    loadImageFile(
      e,
      (imageSrc) => setCover(imageSrc),
      () => setCover('')
    );

  useEffect(() => {
    if (cover !== user.profileCover) {
      dispatch(edit({ id: user.id, profileCover: cover }));
    }
  }, [cover]);

  return (
    <div
      className="page-profile__cover profile-cover"
      style={cover ? { backgroundImage: `url(${cover})` } : {}}
    >
      {(currentUser?.isModerator || isCurrentUser) && (
        <form className="profile-cover__nav">
          <input
            type="file"
            id="profile-cover-input"
            name="profile-cover-input"
            onChange={handleChange}
            accept=".jpg,.jpeg,.png"
            hidden
          />

          <Button
            title="Change cover"
            icon={{
              iconSrc: imageIcon,
            }}
            isLabelFor="profile-cover-input"
            className="profile-cover__add"
          />

          <Button
            callback={() => setCover('')}
            icon={{
              iconSrc: trashIcon,
              iconOnly: true,
            }}
            className="profile-cover__clear"
          />
        </form>
      )}
    </div>
  );
};

export default ProfileCover;
