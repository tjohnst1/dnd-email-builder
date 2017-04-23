import React from 'react';
import { Provider } from 'react-redux';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import configureStore from '../store/configureStore';

import MenuBar from './MenuBar';
import OptionsPanel from './OptionsPanel';
import PreviewPanel from './PreviewPanel';

const store = configureStore();

const App = () =>
  <Provider store={store}>
    <main>
      <MenuBar />
      <DragDropContextProvider backend={HTML5Backend}>
        <div className="panel-container">
          <OptionsPanel />
          <PreviewPanel />
        </div>
      </DragDropContextProvider>
    </main>
  </Provider>;

export default App;
