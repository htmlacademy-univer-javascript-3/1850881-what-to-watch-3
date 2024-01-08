import {Film} from './film.ts';
import {Comment} from './comment.ts';
import {User} from './user.ts';
import {AuthorizationStatus} from './authorization-status.ts';
import {store} from '../store';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type DataState = {
  films: Film[];
  promoFilm: Film | null;
  currentGenre: string;
  favoriteFilms: Film[];
  filteredFilms: Film[];
  cardsCount: number;
  isFilmsLoading: boolean;
  hasError: boolean;
}

export type UserState = {
  user: User | null;
  authStatus: AuthorizationStatus;
}

export type FilmState = {
  film: Film | null;
  comments: Comment[];
  similarFilms: Film[];
}
