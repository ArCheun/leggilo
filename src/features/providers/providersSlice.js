import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import server from "../../api/server";
import LoadingStatus from "../../util/loadingStatus";

const {createEntityAdapter} = require("@reduxjs/toolkit");

const providersAdapter = createEntityAdapter();

const initialState = providersAdapter.getInitialState({
    loadingStatus: LoadingStatus.idle
});

export const fetchProviders = createAsyncThunk('providers/fetchProviders', async () => {
    return await server.fetchProviders();
});

const providersSlice = createSlice({
    name: 'providers',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
               .addCase(fetchProviders.pending, (state, action) => {
                state.loadingStatus = LoadingStatus.loading
            })
            .addCase(fetchProviders.fulfilled, (state, action) => {
                providersAdapter.setAll(state, action.payload)
                state.loadingStatus = LoadingStatus.idle
            })
            .addCase(fetchProviders.rejected, (state, action) => {
                state.loadingStatus = LoadingStatus.error
            });
    }
});

export const {selectAll: fetchAllProviders} = providersAdapter.getSelectors(state => state.providers);

export const providerListLoadingStatusSelector = createSelector(state => state.providers, providers => providers.loadingStatus);

export default providersSlice.reducer;


