import {FilmCard} from '../film-card/film-card';
import {Film} from '../../types/film';

type FilmListProps = {
  films: Film[];
}

export function FilmList({films}: FilmListProps) {
  return (
    <div className="catalog__films-list">
      {
        films.map((film) => <FilmCard filmName={film.name} posterImg={film.posterImg} id={film.id} key={film.id}/>)
      }
    </div>
  );
}
