import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { User, UserService } from '../../models/user';
import store from "../configureStore";

export type appDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<appDispatch>();

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
    try {
        const { data } = await axios.get("user");
        return data;
    } catch (error) {
        return error;
    }
});

export const clearUser = createAsyncThunk('user/clearUser', async () => {
    try {
        const { data } = await axios.post("logout");
        return data;
    } catch (error) {
        return error;
    }
});

const initialState: {
    user: UserService
} = {
    user: {
            userData: new User(),
            loading: undefined,
            error: undefined,
            finished: undefined
    }
}

export const setUserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state: any, action) => {
            state.user = action.payload;
        },
    },
    extraReducers(builder) {
        // Builder fetchUser
        builder.addCase(fetchUser.pending, (state, action) => {
            state.user = { userData: undefined, loading: true, error: false, finished: false }
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.user = { userData: action.payload, loading: false, error: false, finished: true }
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.user = { userData: undefined, loading: false, error: true, finished: true }
        });
        // Builder clearUser
        builder.addCase(clearUser.pending, (state, action) => {
            state.user = { userData: undefined, loading: true, error: false, finished: false }
        });
        builder.addCase(clearUser.fulfilled, (state, action) => {
            state.user = { userData: undefined, loading: false, error: false, finished: true }
        });
        builder.addCase(clearUser.rejected, (state, action) => {
            state.user = { userData: undefined, loading: false, error: true, finished: true }
        });
    },
});

// export const getUser = (payload: any): any => async (dispatch: (e: any) => void) => {
//     dispatch(setUser({ userData:{}, loading: true, error: false }));
//     try {
//         const { data } = await axios.get("user");
//         dispatch(setUser({ userData: { ...data }, loading: false, error: false }));
//     } catch (e) {
//         dispatch(setUser({ userData: {}, loading: false, error: true }));
//       }
// }

export const { setUser } = setUserSlice.actions;

export const selectUser = (state:any) => state.user;

export default setUserSlice.reducer;