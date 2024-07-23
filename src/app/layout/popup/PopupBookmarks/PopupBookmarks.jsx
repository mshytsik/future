import Popup from '../Popup/Popup';
import { Bookmarks } from '../../../components';

const PopupBookmarks = ({ isActive }) => {
  const title = (
    <>
      Customizing
      <br />
      the bookmarks bar
    </>
  );

  return (
    <Popup isActive={isActive} head={{ title }}>
      <Bookmarks title="categor|y|ies|ies" />
    </Popup>
  );
};

export default PopupBookmarks;
