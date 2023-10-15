import {Film} from '../../types/film';
import {Catalog} from '../../components/catalog/catalog.tsx';
import {Copyright} from '../../components/copyright/copyright.tsx';
import {Logo} from '../../components/logo/logo.tsx';
import {UserBlock} from '../../components/user-block/user-block.tsx';

export type MainScreenProps = {
  films: Film[];
  promoFilm: Film;
  genres: string[];
}

export function MainPage({films, promoFilm, genres}: MainScreenProps) {
  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm.backgroundImg} alt={promoFilm.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo isLight={false}/>
          <UserBlock/>
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promoFilm.posterImg} alt={`${promoFilm.name} poster`} width="218" height="327"/>
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm.genre}</span>
                <span className="film-card__year">{promoFilm.releaseYear}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <Catalog films={films} genres={genres}/>

        <footer className="page-footer">
          <Logo isLight/>
          <Copyright/>
        </footer>
      </div>
    </>
  );
}
