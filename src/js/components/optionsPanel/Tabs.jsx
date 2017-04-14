import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import Tab from './Tab';
import { switchTab, switchCategory } from '../../actions/actions';

export const Tabs = (props) => {
  const tabNames = ['Blocks', 'Styles'];
  const currentTab = props.currentTab;

  const handleSwitchTab = tabName => (e) => {
    e.preventDefault();
    props.dispatch(switchCategory(null));
    props.dispatch(switchTab(tabName));
  };

  const tabElements = tabNames.map(tabName => <Tab
    tabName={tabName}
    active={currentTab === tabName}
    key={shortid.generate()}
    handleSwitchTab={handleSwitchTab(tabName)}
  />);

  return (
    <ul className="tabs">
      {tabElements}
    </ul>
  );
};

Tabs.propTypes = {
  currentTab: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  const { currentTab } = state;
  return {
    currentTab,
  };
}

export default connect(mapStateToProps)(Tabs);
