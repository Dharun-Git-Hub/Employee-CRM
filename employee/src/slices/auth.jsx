import { createSlice } from "@reduxjs/toolkit";

const storedAuth = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : null;

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: storedAuth?.user || null,
        token: storedAuth?.token || null,
        isAuthenticated: !!storedAuth,
    },
    reducers: {
        loginSuccess:(state,action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem('user',action.payload.user.given_name)
        },
        logOut:(state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('auth')
        },
    },
})

export default authSlice.reducer
export const {loginSuccess,logOut} = authSlice.actions