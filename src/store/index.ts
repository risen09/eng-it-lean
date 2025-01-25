import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import { setupListeners } from '@reduxjs/toolkit/query';

const rootReducer = combineReducers({
  // Add the generated reducer as a specific top-level slice
  [api.reducerPath]: api.reducer
})

export function setupStore(preloadedState?: Partial<RootState>) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
    preloadedState
  });

  setupListeners(store.dispatch);
  return store;
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch'];
