import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authorSlice from './reducers/AuthorSlice';
import LoginSlice from './reducers/LoginSlice';

const reducerSlice = combineReducers({
    author: authorSlice,
    login: LoginSlice
  });


const store = configureStore({
    reducer: reducerSlice
})

export default store;