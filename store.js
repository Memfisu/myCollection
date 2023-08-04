import { configureStore } from '@reduxjs/toolkit'
import collectionsListReducer from './src/slices/collectionsListSlice'

export const store = configureStore({
  reducer: {
    collectionsList: collectionsListReducer,
  },
})