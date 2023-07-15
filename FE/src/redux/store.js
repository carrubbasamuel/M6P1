import { combineReducers, configureStore } from '@reduxjs/toolkit';
import LoginSlice from './reducers/LoginSlice';
import PostSlice from './reducers/PostSlice';

const reducerSlice = combineReducers({
    author: PostSlice,
    login: LoginSlice
  });


const store = configureStore({
    reducer: reducerSlice
})

export default store;