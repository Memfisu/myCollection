import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  filteredList: [],
};

export const collectionsListSlice = createSlice({
  name: 'collectionsList',
  initialState,
  reducers: {
    addCollectionsList: (state, action) => {
      state.list = [...action.payload];
    },
    updateFilteredCollectionsList: (state, action) => {
      state.filteredList = [...action.payload];
    },
    filterCollectionsList: (state, action) => {
      state.selectedTag = action.payload;

      if (!action.payload) {
        state.filteredList = [...state.list];
      } else {
        state.filteredList = [
          ...state.list?.filter((item) => {
            return item?.myTags?.find((tag) => tag.value === action.payload);
          }),
        ];
      }
    },
    searchCollectionsList: (state, action) => {
      const searchString = action.payload?.searchString;

      if (!searchString) {
        state.filteredList = [...state.list];
      } else {
        state.filteredList = [
          ...state.list?.filter(
            (item) =>
              item.title?.toLowerCase().includes(searchString.toLowerCase()) ||
              item.description
                ?.toLowerCase()
                .includes(searchString.toLowerCase())
          ),
        ];
      }
    },
  },
});

export const {
  addCollectionsList,
  filterCollectionsList,
  searchCollectionsList,
  updateFilteredCollectionsList,
} = collectionsListSlice.actions;

export const selectCollectionsListItems = (state) => state.collectionsList.list;
export const selectFilteredCollectionsListItems = (state) =>
  state.collectionsList.filteredList;
export const selectSelectedTag = (state) => state.collectionsList.selectedTag;

export default collectionsListSlice.reducer;
