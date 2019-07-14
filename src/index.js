import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { HashRouter } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import routes from './routes';
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import './index.css';

import configureStore from './configureStore';
let { store, persistor } = configureStore();

console.log("Hello! Nice to meet you!")
console.log("Questions about the site? Contact Kyle!")
console.log("kjyohler@iu.edu")

window.store = store;

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HashRouter children={routes} />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();