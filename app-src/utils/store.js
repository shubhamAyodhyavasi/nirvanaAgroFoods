import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
// import {AsyncStorage as storage} from '@react-native-community/async-storage';
// import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-community/async-storage';
import logger from 'redux-logger';
import app from '../modules/app.module';
import cart from '../modules/cart';
import order from '../modules/order';
import user from '../modules/user';

const analytics = () => (next) => (action) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: action.type,
    payload: action.payload,
  });

  return next(action);
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['cart', 'order', 'user'],
};
const middlewares = [
  thunk,
  process.env.NODE_ENV !== 'production' && logger,
  analytics,
].filter(Boolean);
const allReducers = combineReducers({
  cart,
  app,
  order,
  user,
  //   referrer: persistReducer(sessionRedConfig, referrer)
});
const enhancer = compose(applyMiddleware(...middlewares));
const persistedReducer = persistReducer(persistConfig, allReducers);

export default () => {
  let store = createStore(
    persistedReducer,
    //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    undefined,
    enhancer,
  );
  let persistor = persistStore(store);
  return {store, persistor};
};
