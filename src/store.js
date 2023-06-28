import { configureStore } from '@reduxjs/toolkit'
import {vendorReducer} from './features/Reducers'

export const store = configureStore({
  reducer: {
    vendor: vendorReducer
  },
})