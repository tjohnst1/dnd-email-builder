import React, { PropTypes } from 'react';
import { startCase } from 'lodash';

const MenuItem = (props) => {
  const { text, icon, handleSwitchCategory } = props;
  return (
    <button className="options-pane__item" onClick={handleSwitchCategory}>
      <img src={icon} alt={text} />
      <p>{ startCase(text) }</p>
    </button>
  );
};

MenuItem.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  handleSwitchCategory: PropTypes.func.isRequired,
};

export default MenuItem;
