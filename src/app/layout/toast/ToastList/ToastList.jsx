import { useSelector } from 'react-redux';
import { selectToasts } from '../../../store/reducers/toastsReducer';

import Toast from '../Toast/Toast';

import './ToastList.scss';

const ToastList = () => {
  const toasts = useSelector(selectToasts);

  return (
    <div className="toast-list">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          buttons={toast.buttons}
        />
      ))}
    </div>
  );
};

export default ToastList;
