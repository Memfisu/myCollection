import { configureStore } from '@reduxjs/toolkit'
import collectionsListReducer from './src/slices/collectionsListSlice'
import itemsListReducer from './src/slices/itemsListSlice'
import formFieldsReducer from './src/slices/formSlice'

export const store = configureStore({
  reducer: {
    collectionsList: collectionsListReducer,
    itemsList: itemsListReducer,
    formFields: formFieldsReducer,
  },
})