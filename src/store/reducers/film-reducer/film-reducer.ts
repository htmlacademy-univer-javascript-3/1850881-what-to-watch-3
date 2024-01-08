import {FilmState} from '../../../types/state.ts';
import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../../constants.ts';
import {
  fetchFilmAction,
  fetchFilmCommentsAction,
  fetchSimilarFilmsAction,
  postFavoriteFilmAction
} from '../../api-actions.ts';

const initialState: FilmState = {
  film: null,
  comments: [],
  similarFilms: []
};

export const filmReducer = createSlice({
  name: NameSpace.Film,
  initialState: initialState,
  reducers: {
    resetFilmState: (state) => {
      state.film = null;
      state.comments = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmAction.fulfilled, (state, action) => {
        state.film = action.payload;
      })
      .addCase(fetchFilmAction.rejected, (state) => {
        state.film = null;
      })
      .addCase(fetchFilmCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(fetchFilmCommentsAction.rejected, (state) => {
        state.comments = [];
      })
      .addCase(postFavoriteFilmAction.fulfilled, (state, action) => {
        state.film = action.payload;
      })
      .addCase(fetchSimilarFilmsAction.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
      })
      .addCase(fetchSimilarFilmsAction.rejected, (state) => {
        state.similarFilms = [];
      });
  },
});

export const {resetFilmState} = filmReducer.actions;
