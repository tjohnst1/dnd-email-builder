import React, { PropTypes } from 'react';

const Button = (props) => {
  const { icon, text, handleSwitchCategory } = props;
  return (
    <button className="button" onClick={handleSwitchCategory}>
      <img className="button__img" src={icon} alt={text} />
      <p>{ text }</p>
    </button>
  );
};

Button.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  handleSwitchCategory: PropTypes.func.isRequired,
};

export default Button;
