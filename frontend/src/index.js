import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './Store';
import './App.css'
import {positions,transitions,Provider as AlertProvider} from 'react-alert'
import  AlertTemplate  from 'react-alert-template-basic';
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

// import { Alert } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));
let persistor = persistStore(store)

const options = {
  timeout : 5000,
  position : positions.BOTTOM_CENTER,
  transition : transitions.SCALE,
}

root.render(
  <Provider store={store}>
  <PersistGate persistor={persistor}>
  <AlertProvider template={AlertTemplate} {...options}>
    <App />
    </AlertProvider>
    </PersistGate>
  </Provider>
);
