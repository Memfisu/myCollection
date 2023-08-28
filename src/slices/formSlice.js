import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  fields: [],
  values: {}
}

export const formSlice = createSlice({
  name: 'formFields',
  initialState,
  reducers: {
    addFieldsList: (state, action) => {
      state.fields = [...action.payload].sort((a, b) => a.order - b.order)
    },
    addFieldsValues: (state, action) => {
      state.values = {
        ...state.values,
        [action.payload.fieldName]: action.payload.fieldValue
      }
    },
  },
})

export const { addFieldsList, addFieldsValues } = formSlice.actions

export const selectFieldsList = state => state.formFields.fields
export const selectValuesList = state => state.formFields.values

export default formSlice.reducer