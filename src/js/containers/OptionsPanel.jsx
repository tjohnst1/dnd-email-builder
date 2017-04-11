import React from 'react';
import Tabs from '../components/optionsPanel/Tabs';
import OptionsPane from '../components/optionsPanel/OptionsPane';


const OptionsPanel = () => (
  <section className="options-panel">
    <Tabs />
    <OptionsPane />
  </section>
);

export default OptionsPanel;
