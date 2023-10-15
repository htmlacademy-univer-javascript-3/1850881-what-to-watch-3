import {Film} from '../../types/film';
import {FilmCard} from '../film-card/film-card';
import {GenresItem} from '../genres-item/genres-item.tsx';

type CatalogProps = {
  films: Film[];
  genres: string[];
}

export function Catalog({films, genres}: CatalogProps) {
  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <ul className="catalog__genres-list">
        <GenresItem isActive url={'#'} genre={'All genres'}/>
        {
          genres.map((genre) => <GenresItem isActive={false} url={'#'} genre={genre} key={self.crypto.randomUUID()}/>)
        }
      </ul>

      <div className="catalog__films-list">
        {
          films.map((film) => <FilmCard filmName={film.name} posterImg={film.posterImg} key={self.crypto.randomUUID()}/>)
        }
      </div>

      <div className="catalog__more">
        <button className="catalog__button" type="button">Show more</button>
      </div>
    </section>
  );
}
