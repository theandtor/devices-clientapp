import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import reducer from '../shared/reducer';

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActionPaths: ['payload.config', 'payload.request', 'error', 'meta.arg'],
    },
  }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
