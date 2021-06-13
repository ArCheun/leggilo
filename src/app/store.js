import {configureStore} from '@reduxjs/toolkit';
import postsReducer from "../features/posts/postsSlice";
import providersReducer from "../features/providers/providersSlice";
import filtersReducer from "../features/filters/filtersSlice";

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        providers: providersReducer,
        filters: filtersReducer,
    },
});
