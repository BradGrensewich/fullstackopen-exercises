const MessageDisplay = ({ text, isError }) => {
  const messageStyle = { backGroundColor: 'gray', padding: '12px' };
  isError
    ? (messageStyle.border = '2px solid red')
    : (messageStyle.border = '2px solid green');
  return (
    <div>
      <h3 style={messageStyle}>{text}</h3>
    </div>
  );
};

export default MessageDisplay;
