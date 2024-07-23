import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hide } from '../../../store/reducers/popupReducer';

import Popup from '../Popup/Popup';
import SearchForm from '../../../components/SearchForm/SearchForm';

import './PopupSearch.scss';
import './PopupSearchTheme.scss';

const PopupSearch = ({ isActive, search }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = () => {
    navigate('/search');
    dispatch(hide());
  };

  return (
    <Popup
      isActive={isActive}
      size="sm"
      head={{ title: 'Search' }}
      className="search-popup"
    >
      <SearchForm search={search} callback={handleSubmit} isPopup={true} />
    </Popup>
  );
};

export default PopupSearch;
