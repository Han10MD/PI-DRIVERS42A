import { configureStore } from '@reduxjs/toolkit'
import driverReducer from './driverSlice'

export const store = configureStore({
    reducer: {
        driver: driverReducer
    }
})