import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const collectionsListSlice = createSlice({
  name: 'collectionsList',
  initialState,
  reducers: {
    addCollectionsList: (state, action) => {
      state.list = [...action.payload]
    },
    filterCollectionsList: (state, action) => {
      state.selectedTag = action.payload

      if (!action.payload) {
        state.filteredList = [...state.list]
      } else {
        state.filteredList = [...state.list?.filter(item => item?.tags?.includes(action.payload))]
      }
    },
  },
})

export const { addCollectionsList, filterCollectionsList } = collectionsListSlice.actions

export const selectCollectionsListItems = state => state.collectionsList.list
export const selectFilteredCollectionsListItems = state => state.collectionsList.filteredList
export const selectSelectedTag = state => state.collectionsList.selectedTag

export default collectionsListSlice.reducer