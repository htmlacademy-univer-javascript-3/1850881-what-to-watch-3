import {ALL_GENRES} from '../../constants.ts';
import {Film} from '../../types/film.ts';

export const getGenresList = (films: Film[]) => (
  [ALL_GENRES].concat(...new Set(films.map((film) => film.genre)))
);
