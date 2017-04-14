import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';

import MenuBar from './MenuBar';
import OptionsPanel from './OptionsPanel';
import PreviewPanel from './PreviewPanel';

import dummyData from '../data/dummyData';

const store = configureStore(dummyData);

const App = () =>
  <Provider store={store}>
    <main>
      <MenuBar />
      <div className="panel-container">
        <OptionsPanel />
        <PreviewPanel />
      </div>
    </main>
  </Provider>;

export default App;
