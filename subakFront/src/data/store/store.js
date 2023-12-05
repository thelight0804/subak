import {combineReducers} from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import userData from './userSlice';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistCombineReducers, persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const rootReducer = combineReducers({
  userData: userData.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: {
    userData: userData.reducer,
  }
});

const persistor = persistStore(store);
export {store, persistor};