import { configureStore } from '@reduxjs/toolkit';
import setUserSlice from "./slices/setUserSlice";

export default configureStore({ reducer: { user: setUserSlice } });