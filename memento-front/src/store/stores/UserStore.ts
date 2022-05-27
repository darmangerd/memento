import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store";

export interface UserState {
    email: string;
    id: string;
    token: string;
}

const initialState: Partial<UserState> = {};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loadSession(state) {
            const loadedUser = localStorage.getItem("user");
            if (loadedUser) {
                return JSON.parse(loadedUser);
            }
            state = {};
            return state;
        },
        signIn(state, action) {
            state.token = action.payload.token;
            state.email = action.payload.email;
            state.id = action.payload.id;
            localStorage.setItem("user", JSON.stringify(state));
            return state;
        },
        signOut(state) {
            state = {};
            localStorage.setItem("user", JSON.stringify({}));
            return state;
        }
    }
});

export const {signIn, signOut, loadSession} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;
export const selectUserToken = (state: RootState) => state.user.token;

export default userSlice.reducer;
