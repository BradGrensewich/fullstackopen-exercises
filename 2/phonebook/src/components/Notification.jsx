const Notification = ({ notification }) => {
	if (notification === null) {
		return;
	}	
    const notificationStyles = {
		color: notification.error ? 'red' : 'green',
		background: 'lightgrey',
		fontSize: '20px',
		borderStyle: 'solid',
		borderRadius: '5px',
		padding: '10px',
		marginBottom: '10px',
	};
	return <div style={notificationStyles}>{notification.text}</div>;
};

export default Notification;
