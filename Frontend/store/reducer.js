import { combineReducers } from 'redux';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Define your initial state here
};

const mySlice = createSlice({
  name: 'myData',
  initialState,
  reducers: {
    // Define your actions and reducers here
  },
});

const rootReducer = combineReducers({
  myData: mySlice.reducer,
  // Add more slices as needed
});

export default rootReducer;