import React from 'react';
import { Provider } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContextProvider } from 'react-dnd';
import configureStore from '../store/configureStore';

import OptionsPanel from './OptionsPanel';
import PreviewPanel from './PreviewPanel';
import ExportModal from './ExportModal';

const store = configureStore();

const App = () =>
  <Provider store={store}>
    <main>
      <DragDropContextProvider backend={HTML5Backend}>
        <div className="panel-container">
          <OptionsPanel />
          <PreviewPanel />
        </div>
      </DragDropContextProvider>
      <ExportModal />
    </main>
  </Provider>;

export default App;
