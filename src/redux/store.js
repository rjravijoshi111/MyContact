import { combineReducers, createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { Asyncstorage } from 'react-native';
import storage from 'redux-persist/lib/storage';
import rootReducer from "./reducer";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

const persistConfig = {
    key : 'root',
    storage : storage,
    // blacklist : ['counter','user'],
    stateReconciler : autoMergeLevel2
}

export const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = createStore(persistedReducer);
export const persistor = persistStore(store)

// export const store = createStore(rootReducer);

