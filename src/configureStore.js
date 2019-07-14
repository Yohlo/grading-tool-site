import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import dataService from './services';

import rootReducer from './reducers'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['assignments', 'loading', 'message', 'user', 'admin']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let store = createStore(persistedReducer, {}, applyMiddleware(dataService));
  //let store = createStore(rootReducer, {}, applyMiddleware(dataService));
  let persistor = persistStore(store)
  return { store, persistor }
}