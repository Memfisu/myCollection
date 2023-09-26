import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: [],
  filteredList: []
}

export const itemsListSlice = createSlice({
  name: 'itemsList',
  initialState,
  reducers: {
    addItemsList: (state, action) => {
      state.list = [...action.payload]
      state.filteredList = [...action.payload]
    },
    addItemData: (state, action) => {
      state.item = action.payload
    },
    searchItemsList: (state, action) => {
      const searchString = action.payload?.searchString

      if (!searchString) {
        state.filteredList = [...state.list]
      } else {
        state.filteredList = [...state.list?.filter(item =>
            item.title?.toLowerCase().includes(searchString.toLowerCase())
            || item.description?.toLowerCase().includes(searchString.toLowerCase()))
        ]
      }
    },
  },
})

export const { addItemsList, addItemData, searchItemsList } = itemsListSlice.actions

export const selectItemsListItems = state => state.itemsList.filteredList
export const selectItemData = state => state.itemsList.item

export default itemsListSlice.reducer