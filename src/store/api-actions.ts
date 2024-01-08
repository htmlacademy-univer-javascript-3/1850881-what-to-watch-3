import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {AppDispatch, State} from '../types/state.ts';
import {Film} from '../types/film.ts';
import {Comment} from '../types/comment.ts';
import {User} from '../types/user.ts';
import {AuthData} from '../types/auth-data.ts';

type ApiConfig = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export const fetchFilmAction = createAsyncThunk<Film, string, ApiConfig>(
  'data/fetchFilm',
  async (id: string, {extra: api}) => {
    const {data} = await api.get<Film>(`films/${id}`);
    return data;
  }
);

export const fetchFilmCommentsAction = createAsyncThunk<Comment[], string, ApiConfig>(
  'data/fetchFilmComments',
  async (id: string, {extra: api}) => {
    const {data} = await api.get<Comment[]>(`comments/${id}`);
    return data;
  }
);

export const postFilmCommentAction = createAsyncThunk<void, {
  filmId: string;
  comment: string;
  rating: number;
}, ApiConfig>(
  'data/postFilmComment',
  async ({comment, rating, filmId}, {extra: api}) => {
    await api.post<Comment>(`comments/${filmId}`, {comment, rating});
  }
);

export const fetchFilmsAction = createAsyncThunk<Film[], undefined, ApiConfig>(
  'data/fetchFilms',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Film[]>('films');
    return data;
  }
);

export const fetchPromoFilmAction = createAsyncThunk<Film, undefined, ApiConfig>(
  'data/fetchPromoFilm',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Film>('promo');
    return data;
  }
);

export const fetchSimilarFilmsAction = createAsyncThunk<Film[], string, ApiConfig>(
  'data/fetchSimilarFilms',
  async (id: string, {extra: api}) => {
    const {data} = await api.get<Film[]>(`films/${id}/similar`);
    return data;
  }
);

export const fetchFavoriteFilmsAction = createAsyncThunk<Film[], undefined, ApiConfig>(
  'data/fetchFavoriteFilms',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Film[]>('favorite');
    return data;
  }
);

export const postFavoriteFilmAction = createAsyncThunk<Film, { filmId: string; status: boolean }, ApiConfig>(
  'data/postFavoriteFilm',
  async ({filmId, status}, {extra: api}) => {
    const {data} = await api.post<Film>(`favorite/${filmId}/${status ? 1 : 0}`);
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<User, undefined, ApiConfig>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<User>('login');
    return data;
  }
);

export const loginAction = createAsyncThunk<User, AuthData, ApiConfig>(
  'user/login',
  async ({email: email, password}, {extra: api}) => {
    const {data} = await api.post<User>('login', {email, password});
    return data;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, ApiConfig>(
  'user/logout',
  async (_arg, {extra: api}) => {
    await api.delete('logout');
  }
);
