import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { uniqueId } from 'lodash';
import Tab from './Tab';
import { switchTab, switchCategory } from '../../actions/actions';

export const Tabs = (props) => {
  const { selected, names } = props.tabs;

  const handleSwitchTab = name => (e) => {
    e.preventDefault();
    props.dispatch(switchCategory(null));
    props.dispatch(switchTab(name));
  };

  const tabElements = names.map(name => <Tab
    name={name}
    active={selected === name}
    key={uniqueId()}
    handleSwitchTab={handleSwitchTab(name)}
  />);

  return (
    <ul className="tabs">
      {tabElements}
    </ul>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.shape({
    selected: PropTypes.string,
    names: PropTypes.array,
  }).isRequired,
};

function mapStateToProps(state) {
  const { tabs } = state;
  return {
    tabs,
  };
}

export default connect(mapStateToProps)(Tabs);
