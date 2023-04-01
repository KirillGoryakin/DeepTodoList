import { combineReducers } from '@reduxjs/toolkit';
import todoReducer from './slices/todoSlice';

export default combineReducers({
  todo: todoReducer,
});