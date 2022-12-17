import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AppDataProvider } from './state/AppDataProvider';
import reducer, { initialState } from './state/reducer';

ReactDOM.render(
  <React.StrictMode>
    <AppDataProvider initialState={initialState} reducer={reducer}>
      <App />
    </AppDataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

