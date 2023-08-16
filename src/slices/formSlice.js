import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  fields: [],
}

export const formSlice = createSlice({
  name: 'formFields',
  initialState,
  reducers: {
    addFieldsList: (state, action) => {
      state.fields = [...action.payload].sort((a, b) => a.order - b.order)
    },
  },
})

export const { addFieldsList } = formSlice.actions

export const selectFieldsList = state => state.formFields.fields

export default formSlice.reducer