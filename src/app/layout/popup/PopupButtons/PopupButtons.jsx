import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hide } from '../../../store/reducers/popupReducer';

import Popup from '../Popup/Popup';
import { Button } from '../../../components/shared';

import addPost from '../../../assets/img/icons/add-post.svg';
import addConf from '../../../assets/img/icons/add-conf.svg';

import './PopupButtons.scss';
import './PopupButtonsTheme.scss';

const PopupButtons = ({ isActive }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleClick = (id) => {
    dispatch(hide());
    navigate(`/add/${id}`, { refresh: true });
  };

  return (
    <Popup isActive={isActive} className="popup-buttons" size="sm">
      <Button
        callback={() => handleClick('post')}
        title="Post"
        icon={{
          iconSrc: addPost,
          useSVG: true,
        }}
      />

      <Button
        callback={() => handleClick('conference')}
        title="Event"
        icon={{
          iconSrc: addConf,
          useSVG: true,
        }}
      />
    </Popup>
  );
};

export default PopupButtons;
