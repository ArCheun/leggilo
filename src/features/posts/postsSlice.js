import {createAsyncThunk, createEntityAdapter, createSelector, createSlice} from "@reduxjs/toolkit";
import server from "../../api/server";
import LoadingStatus from "../../util/loadingStatus";

const postsAdapter = createEntityAdapter();

const initialState = postsAdapter.getInitialState({
    loadingStatus: LoadingStatus.idle
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (providerIds) => {
    return await server.fetchPostOfProviders(providerIds);
})

const postsSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.loadingStatus = LoadingStatus.loading
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                postsAdapter.setAll(state, action.payload);
                state.loadingStatus = LoadingStatus.idle;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loadingStatus = LoadingStatus.error;
            });
    }
});

export const {selectAll: selectAllPosts} = postsAdapter.getSelectors(state => state.posts);

export const postListLoadingStatusSelector = createSelector(state => state.posts, posts => posts.loadingStatus);

export default postsSlice.reducer;
