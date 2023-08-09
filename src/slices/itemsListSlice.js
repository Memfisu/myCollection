import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const itemsListSlice = createSlice({
  name: 'itemsList',
  initialState,
  reducers: {
    addItemsList: (state, action) => {
      state.list = [...action.payload]
    },
  },
})

export const { addItemsList } = itemsListSlice.actions

export const selectItemsListItems = state => state.itemsList.list

export default itemsListSlice.reducer