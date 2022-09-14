import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import setUserSlice from "./slices/setUserSlice";

export default configureStore({ reducer: { user: setUserSlice } });