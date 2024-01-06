import {GenresItem} from '../genres-item/genres-item.tsx';
import {getGenresList} from './get-genres-list.ts';
import {MAX_GENRES_COUNT} from '../../constants.ts';
import {Film} from '../../types/film.ts';

type GenresListProps = {
  films: Film[];
}

export function GenresList({films}: GenresListProps) {
  const genres = getGenresList(films);
  return (
    <ul className="catalog__genres-list">
      <GenresItem isActive url={'#'} genre={genres[0]}/>
      {
        genres.slice(1, MAX_GENRES_COUNT + 1)
          .map((genre) => <GenresItem isActive={false} url={'#'} genre={genre} key={genre}/>)
      }
    </ul>
  );
}
