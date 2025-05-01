import { useSelector } from 'react-redux';

const Notification = () => {
  const message = useSelector((state) => state.notification);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  if (message === '') {
    return;
  }

  return <div style={style}>{message}</div>;
};

export default Notification;
