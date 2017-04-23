import React from 'react';
import { shallow, mount, render } from 'enzyme';

import OptionsPanel from '../js/containers/OptionsPanel.jsx';
import { Tabs } from '../js/components/optionsPanel/Tabs.jsx';
import Tab from '../js/components/optionsPanel/Tab.jsx';
import { OptionsPane } from '../js/components/optionsPanel/OptionsPane.jsx';
import dummyData from '../js/data/dummyData'

let props = dummyData;

describe('<OptionsPanel />', () => {
  const optionsPanelContainer = shallow(<OptionsPanel />);

  test("should render itself and it's subcomponents", () => {
    expect(optionsPanelContainer).toHaveLength(1);
    expect(optionsPanelContainer.children().length).toEqual(2);
  });
});

describe('<Tabs />', () => {

  const tabsContainer = shallow(<Tabs {...props} />);

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

  const tabComponent = shallow(<Tab {...props} />);

  test("should render itself", () => {
    expect(tabComponent.exists()).toBe(true);
  });

  test("should receive props", () => {
    expect(tabComponent.instance().props.active).toEqual(true);
    expect(tabComponent.instance().props.tabName).toEqual('Blocks');
    expect(tabComponent.instance().props.handleSwitchTab()).toEqual('switched');
  })

});

describe('<OptionsPane />', () => {
  props = dummyData;
  props.dispatch = jest.fn(() => 'dispatch');

  let optionsPaneComponent = shallow(<OptionsPane {...props} />);

  test('should render', () => {
    expect(optionsPaneComponent.exists()).toBe(true);
  })

  test('should receive props', () => {
    expect(optionsPaneComponent.instance().props.currentTab).toEqual('Blocks');
    expect(optionsPaneComponent.instance().props.currentCategory).toEqual(null);
    expect(optionsPaneComponent.instance().props.emailBlocks.isFetching).toEqual(false);
    expect(optionsPaneComponent.instance().props.emailBlocks.categories[0].name).toEqual('one-column');
  })

  test('should contain two buttons if the currentCategory is null', () => {
    expect(optionsPaneComponent.children().length).toEqual(2);
  })

  test('should contain three blocks if the currentCategory is one-column', () => {
    props.currentCategory = "one-column";
    optionsPaneComponent = shallow(<OptionsPane {...props} />);
    expect(optionsPaneComponent.children().length).toEqual(3);
  })

})
