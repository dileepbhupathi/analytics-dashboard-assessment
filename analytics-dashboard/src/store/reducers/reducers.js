import { createSlice } from "@reduxjs/toolkit";
export const evSlice = createSlice({
  name: "evReducer",
  initialState: {
    evData: [],
    filteredEVData: [],
    selectedMakes: [],
    selectedTypes: [],
    selectedYears: [],
  },
  reducers: {
    updateEVData: (state, action) => {
      state.evData = action.payload;
    },
    updateFilteredEVData: (state, action) => {
      state.filteredEVData = action.payload;
    },
    updateSelectedMakes: (state, action) => {
      state.selectedMakes = action.payload;
    },
    updateSelectedTypes: (state, action) => {
      state.selectedTypes = action.payload;
    },
    updateSelectedYears: (state, action) => {
      state.selectedYears = action.payload;
    },
  },
});

export const {
  updateEVData,
  updateFilteredEVData,
  updateSelectedMakes,
  updateSelectedTypes,
  updateSelectedYears,
} = evSlice.actions;

export default evSlice.reducer;
