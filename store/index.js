import { configureStore} from '@reduxjs/toolkit';
import complaintSlice from './complaintSlice';
import userSlice from './userSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import { createWrapper,HYDRATE } from 'next-redux-wrapper';
const persistConfig={
    key:'root',
    version:1,
    storage 
}
const reducer=combineReducers({
    complaints: complaintSlice.reducer,
    user:userSlice.reducer,
});

const persistedReducer=persistReducer(persistConfig,reducer);

const store = configureStore({
    reducer: persistedReducer,
});
// export const wrapper=createWrapper(store);

export default store;