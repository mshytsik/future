import { useDispatch } from 'react-redux';
import { add } from '../store/reducers/toastsReducer';

const useToast = () => {
  const dispatch = useDispatch();

  return (toast) => {
    dispatch(add({ ...toast, id: Date.now() }));
  };
};

export default useToast;
