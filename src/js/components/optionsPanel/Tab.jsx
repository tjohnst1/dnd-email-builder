import React, { PropTypes } from 'react';
import classNames from 'classnames';

const Tab = (props) => {
  const classes = classNames({
    tab: true,
    active: props.active,
  });

  return (
    <li role="presentation" className={classes}>
      <button onClick={props.handleSwitchTab}>{props.tabName}</button>
    </li>
  );
};

Tab.propTypes = {
  active: PropTypes.bool.isRequired,
  tabName: PropTypes.string.isRequired,
  handleSwitchTab: PropTypes.func.isRequired,
};

export default Tab;
