import {ALL_GENRES, NameSpace, SHOWN_CARDS_COUNT} from '../../../constants.ts';
import {DataState} from '../../../types/state.ts';
import {Film} from '../../../types/film.ts';
import {createSlice} from '@reduxjs/toolkit';
import {fetchFavoriteFilmsAction, fetchFilmsAction, fetchPromoFilmAction} from '../../api-actions.ts';

const initialState: DataState = {
  films: [],
  promoFilm: null,
  currentGenre: ALL_GENRES,
  favoriteFilms: [],
  filteredFilms: [],
  cardsCount: 0,
  isFilmsLoading: false,
  hasError: false
};

const filterFilms = (films: Film[], genre: string): Film[] => {
  if (genre === ALL_GENRES) {
    return films;
  }
  return films.filter((film) => film.genre === genre);
};

export const dataReducer = createSlice({
  name: NameSpace.Data,
  initialState: initialState,
  reducers: {
    changeGenre: (state, action: { payload: string }) => {
      const filteredFilms = filterFilms(state.films, action.payload);
      state.currentGenre = action.payload;
      state.filteredFilms = filteredFilms;
      state.cardsCount = filteredFilms.length > SHOWN_CARDS_COUNT ? SHOWN_CARDS_COUNT : filteredFilms.length;
    },
    increaseCardCount: (state) => {
      state.cardsCount = (state.cardsCount + SHOWN_CARDS_COUNT > state.filteredFilms.length) ?
        state.filteredFilms.length :
        state.cardsCount + SHOWN_CARDS_COUNT;
    },
    resetMainPage: (state) => {
      state.currentGenre = ALL_GENRES;
      state.filteredFilms = state.films;
      state.cardsCount = state.filteredFilms.length > SHOWN_CARDS_COUNT ? SHOWN_CARDS_COUNT : state.filteredFilms.length;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isFilmsLoading = true;
        state.hasError = false;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.filteredFilms = action.payload;
        state.promoFilm = action.payload[0];
        state.cardsCount = action.payload.length > SHOWN_CARDS_COUNT ? SHOWN_CARDS_COUNT : action.payload.length;
        state.isFilmsLoading = false;
        state.hasError = false;
      })
      .addCase(fetchFilmsAction.rejected, (state) => {
        state.isFilmsLoading = false;
        state.hasError = true;
      })
      .addCase(fetchFavoriteFilmsAction.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
      })
      .addCase(fetchFavoriteFilmsAction.rejected, (state) => {
        state.favoriteFilms = [];
      })
      .addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
        state.hasError = false;
      })
      .addCase(fetchPromoFilmAction.rejected, (state) => {
        state.promoFilm = null;
        state.hasError = true;
      });
  },
});

export const {
  changeGenre,
  increaseCardCount,
  resetMainPage
} = dataReducer.actions;
