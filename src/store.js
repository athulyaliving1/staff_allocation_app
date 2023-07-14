import { configureStore } from '@reduxjs/toolkit'
import { vendorReducer } from './features/Reducers'
import { staffReducer } from './features/Reducers'

export const store = configureStore({
  reducer: {
    vendor: vendorReducer,
    staff: staffReducer

  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check
    })
  
})