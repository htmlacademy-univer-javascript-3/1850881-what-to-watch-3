import {configureStore} from '@reduxjs/toolkit';
import {createAPI} from '../services/api.ts';
import {reducer} from './reducers/root-reducer.ts';

const api = createAPI();
export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    })
});
