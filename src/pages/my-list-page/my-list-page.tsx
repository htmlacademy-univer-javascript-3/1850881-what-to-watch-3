import {Logo} from '../../components/logo/logo.tsx';
import {FilmList} from '../../components/film-list/film-list.tsx';
import {Film} from '../../types/film.ts';
import {Copyright} from '../../components/copyright/copyright.tsx';

export type MyListPageProps = {
  films: Film[];
}

export function MyListPage({films}: MyListPageProps) {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo isLight={false}></Logo>

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">9</span></h1>
        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
            </div>
          </li>
          <li className="user-block__item">
            <a className="user-block__link">Sign out</a>
          </li>
        </ul>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <FilmList films={films.slice(0, 9)}></FilmList>
      </section>

      <footer className="page-footer">
        <Logo isLight></Logo>
        <Copyright></Copyright>
      </footer>
    </div>
  );
}
