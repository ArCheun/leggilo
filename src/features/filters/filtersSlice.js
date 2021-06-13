import {createSelector, createSlice} from "@reduxjs/toolkit";

const initialState = {
    selectedProviderIds: [],
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState: initialState,
    reducers: {
        filtersChanged(state, action) {
            const {selectedProviderIds} = action.payload;
            state.selectedProviderIds = selectedProviderIds;
            return state;
        },
    }
});

export const {filtersChanged} = filtersSlice.actions;
export const selectedProviderIds = createSelector(state => state.filters, filters => filters.selectedProviderIds);

export default filtersSlice.reducer;
