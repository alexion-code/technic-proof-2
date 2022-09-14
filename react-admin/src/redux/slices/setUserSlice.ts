import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { User } from '../../models/user';
import store from "../configureStore";

export type appDispatch = typeof store.dispatch;
export const useAppDispatch = ()=> useDispatch<appDispatch>();

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
    try {
        const { data } = await axios.get("user");
        return data;
    } catch (error) {
        return error;
    }
    // const { data } = await axios.get("user").then((response) => response.data).catch((error) => error);
    // return data;
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
    user: {
        userData: User|undefined,
        loading: boolean | undefined,
        error: boolean | undefined
    }
} = {
    user: {
            userData: undefined,
            loading: undefined,
            error: undefined
    }
}
// const initialState = {
//     user: {
//         userData: {},
//         loading: undefined,
//         error: undefined
//     }
// }

export const setUserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state: any, action) => {
            state.user = action.payload;
        },
    },
    // extraReducers: {
    //     [fetchUser.pending.type]: (state, action) => {
    //         state.user = {
    //             ...state.user,
    //             loading: true,
    //         };
    //     },
    //     [fetchUser.fulfilled.type]: (state, action) => {
    //         state.user = {
    //             loading: false,
    //             userData: action.payload,
    //             error: false,
    //         };
    //     },
    //     [fetchUser.rejected.type]: (state, action) => {
    //         state.user = {
    //             ...state.user,
    //             loading: false,
    //             error: true,//action.payload,
    //         };
    //     }
    // },
    extraReducers(builder) {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.user = { userData: action.payload, loading: false, error: false }
        });
        builder.addCase(fetchUser.pending, (state, action) => {
            state.user = { userData: state.user.userData, loading: true, error: false }
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.user = { userData: state.user.userData, loading: false, error: false }
        });
        builder.addCase(clearUser.fulfilled, (state, action) => {
            state.user = { userData: undefined, loading: false, error: false }
        });
        builder.addCase(clearUser.pending, (state, action) => {
            state.user = { userData: undefined, loading: true, error: undefined }
        });
        builder.addCase(clearUser.rejected, (state, action) => {
            state.user = { userData: undefined, loading: false, error: true }
        });
    },
});

export const getUser = (payload: any): any => async (dispatch: (e: any) => void) => {
    dispatch(setUser({ userData:{}, loading: true, error: false }));
    try {
        const { data } = await axios.get("user");
        dispatch(setUser({ userData: { ...data }, loading: false, error: false }));
    } catch (e) {
        dispatch(setUser({ userData: {}, loading: false, error: true }));
      }
}

export const { setUser } = setUserSlice.actions;

export const selectUser = (state:any) => state.user;

export default setUserSlice.reducer;