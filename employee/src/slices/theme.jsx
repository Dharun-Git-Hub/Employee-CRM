import { createSlice } from "@reduxjs/toolkit";

const saved = localStorage.getItem('theme')

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        mode: saved,
        username: ''
    },
    reducers: {
        setTheme: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme',state.mode)
        }
    }
})

export const {setTheme} = themeSlice.actions
export default themeSlice.reducer