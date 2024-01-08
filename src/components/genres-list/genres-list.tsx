import {GenresItem} from '../genres-item/genres-item.tsx';
import {ALL_GENRES, MAX_GENRES_COUNT} from '../../constants.ts';
import {useAppSelector} from '../../hooks';
import {getFilms} from '../../store/reducers/data-reducer/selector.ts';
import {Film} from '../../types/film.ts';

const getGenresList = (films: Film[]) => (
  [ALL_GENRES].concat(...new Set(films.map((film) => film.genre)))
);

export function GenresList() {
  const films = useAppSelector(getFilms);
  const genres = getGenresList(films);

  return (
    <ul className="catalog__genres-list">
      <GenresItem genre={genres[0]}/>
      {
        genres.slice(1, MAX_GENRES_COUNT + 1)
          .map((genre) => <GenresItem genre={genre} key={genre}/>)
      }
    </ul>
  );
}
