import {Film} from '../../types/film';
import {GenresItem} from '../genres-item/genres-item.tsx';
import {FilmList} from '../film-list/film-list.tsx';

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

      <FilmList films={films}></FilmList>

      <div className="catalog__more">
        <button className="catalog__button" type="button">Show more</button>
      </div>
    </section>
  );
}
