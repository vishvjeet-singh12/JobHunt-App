import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { companySlice, jobSlice,applicationSlice } from "./SliceStore";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer=combineReducers({
  job:jobSlice.reducer,
  company:companySlice.reducer,
  application:applicationSlice.reducer
})

const persistedReducer=persistReducer(persistConfig,rootReducer)

const Store=configureStore({
    reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export default Store;