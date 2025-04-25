import { useSelector, useDispatch } from 'react-redux';

import { removeNotification } from '../reducers/notificationReducer';

const Notification = () => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.notification);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  if (message === '') {
    return;
  }
  setTimeout(() => dispatch(removeNotification()), 5000);
  return <div style={style}>{message}</div>;
};

export default Notification;
