import {NameSpace} from '../../../constants.ts';
import {State} from '../../../types/state.ts';
import {Film} from '../../../types/film.ts';
import {Comment} from '../../../types/comment.ts';

export const getFilm = (state: Pick<State, NameSpace.Film>): Film | null => state[NameSpace.Film].film;
export const getComments = (state: Pick<State, NameSpace.Film>): Comment[] => state[NameSpace.Film].comments;
export const getSimilarFilms = (state: Pick<State, NameSpace.Film>): Film[] => state[NameSpace.Film].similarFilms;
export const getFilmLoadingStatus = (state: Pick<State, NameSpace.Film>): boolean => state[NameSpace.Film].isFilmLoading;
