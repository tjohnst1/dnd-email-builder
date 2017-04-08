import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';

import MenuBar from './MenuBar.jsx';
import OptionsPanel from './OptionsPanel.jsx';
import PreviewPanel from './PreviewPanel.jsx';

const store = configureStore();

export default class App extends Component {
  render(){
    return (
      <Provider store={store}>
        <main>
          <MenuBar />
          <OptionsPanel />
          <PreviewPanel />
        </main>
      </Provider>
    )
  }
}
