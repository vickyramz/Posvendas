import { createStore, compose,combineReducers, applyMiddleware } from "redux";
import { offlineMiddleware, suspendSaga, consumeActionMiddleware } from "redux-offline-queue";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from 'redux-persist';
import reducers from "./ducks";
import sagas from "./sagas"
import { AsyncStorage } from 'react-native';

const middlewares = [];
const persistConfig = {
    key: 'root',
    keyPrefix: '',
    storage: AsyncStorage, 
   };
const sagaMiddleware = createSagaMiddleware();

middlewares.push(offlineMiddleware());
middlewares.push(suspendSaga(sagaMiddleware));
middlewares.push(consumeActionMiddleware());
const rootReducer = (state, action) => {
    return appReducer(state, action);
  };
  
  const appReducer = reducers;
const createAppropriateStore = 
    process.env.NODE_ENV === "development" ? 
    compose(
        applyMiddleware(...middlewares),
        console.tron.createEnhancer()
    ) : 
    applyMiddleware(...middlewares);
    const pReducer = persistReducer(persistConfig, rootReducer);
    const initialState = {};
const stores = createStore(pReducer,initialState, createAppropriateStore);

sagaMiddleware.run(sagas);

export const store = stores;
export const persistor = persistStore(store);
