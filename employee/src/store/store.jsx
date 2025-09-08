import {configureStore} from '@reduxjs/toolkit'
import themeSlice from '../slices/theme'
import authSlice from '../slices/auth'

const store = configureStore({
    reducer: {
        theme: themeSlice,
        auth: authSlice
    }
})

store.subscribe(()=>{
    console.log(store.getState())
})

export default store