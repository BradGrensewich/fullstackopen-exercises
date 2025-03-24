import { useState } from 'react';
import PropTypes from 'prop-types';

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);
  const toggleVisiblity = () => {
    setVisible(!visible);
  };
  const showWhenVisible = { display: visible ? '' : 'none' };
  const hideWhenVisible = { display: visible ? 'none' : '' };
  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisiblity}>{props.label}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisiblity}>cancel</button>
      </div>
    </>
  );
};

Togglable.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Togglable;
