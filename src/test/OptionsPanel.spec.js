import React from 'react';
import { shallow, mount, render } from 'enzyme';

import OptionsPanel from '../js/containers/OptionsPanel.jsx';
import { Tabs } from '../js/components/optionsPanel/Tabs.jsx';
import Tab from '../js/components/optionsPanel/Tab.jsx';

let props;

describe('<OptionsPanel />', () => {
  const optionsPanelContainer = shallow(<OptionsPanel />);

  test("should render itself and it's subcomponents", () => {
    expect(optionsPanelContainer).toHaveLength(1);
    expect(optionsPanelContainer.children().length).toEqual(1);
  });
});

describe('<Tabs />', () => {
  props = {
    currentTab: "Blocks",
  }

  let tabsContainer = shallow(<Tabs {...props} />);

  test("should render itself", () => {
    expect(tabsContainer.exists()).toBe(true);
  });

  test("should contain two tabs", () => {
    expect(tabsContainer.children().length).toEqual(2);
  });
});

describe('<Tab />', () => {
  props = {
    active: true,
    tabName: 'Blocks',
    handleSwitchTab: jest.fn(() => 'switched'),
  }

  let tabComponent = shallow(<Tab {...props} />);

  test("should render itself", () => {
    expect(tabComponent.exists()).toBe(true);
  });

  test("should receive props", () => {
    expect(tabComponent.instance().props.active).toEqual(true);
    expect(tabComponent.instance().props.tabName).toEqual('Blocks');
    expect(tabComponent.instance().props.handleSwitchTab()).toEqual('switched');
  })

});
