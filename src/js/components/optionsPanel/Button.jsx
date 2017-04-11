import React, { PropTypes } from 'react';

const Button = (props) => {
  const { icon, text } = props;
  return (
    <button className="button">
      <img className="button__img" src={icon} alt={text} />
      { text }
    </button>
  );
};

Button.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Button;
