import { configureStore } from "@reduxjs/toolkit";
import { persistReducer,persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import rootReducer from './reducers/rootReducers'; 

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth','authTodo'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
  });
  
  export const persistor = persistStore(store);

