import {Copyright} from '../../components/copyright/copyright.tsx';
import {Logo} from '../../components/logo/logo.tsx';
import {UserBlock} from '../../components/user-block/user-block.tsx';
import {GenresList} from '../../components/genres-list/genres-list.tsx';
import {FilmList} from '../../components/film-list/film-list.tsx';
import {ShowMoreButton} from '../../components/show-more-button/show-more-button.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {
  getCardCount,
  getFilmsErrorStatus,
  getFilteredFilms,
  getPromoFilm
} from '../../store/reducers/data-reducer/selector.ts';
import {useEffect} from 'react';
import {fetchFavoriteFilmsAction} from '../../store/api-actions.ts';
import {PlayButton} from '../../components/play-button/play-button.tsx';
import {AddToMyListButton} from '../../components/add-to-my-list-button/add-to-my-list-button.tsx';
import {ErrorPage} from '../error-page/error-page.tsx';

export function MainPage() {
  const cardCount = useAppSelector(getCardCount);
  const promoFilm = useAppSelector(getPromoFilm);
  const films = useAppSelector(getFilteredFilms);
  const hasError = useAppSelector(getFilmsErrorStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(fetchFavoriteFilmsAction());
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, promoFilm]);
  if (hasError || !promoFilm) {
    return <ErrorPage/>;
  }

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm.backgroundImage} alt={promoFilm.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo isLight={false}/>
          <UserBlock/>
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promoFilm.posterImage} alt={`${promoFilm.name} poster`} width="218" height="327"/>
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm.genre}</span>
                <span className="film-card__year">{promoFilm.released}</span>
              </p>

              <div className="film-card__buttons">
                <PlayButton filmId={promoFilm.id}/>
                <AddToMyListButton filmId={promoFilm.id} isFavorite={promoFilm.isFavorite}/>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList/>
          <FilmList films={films.slice(0, cardCount)}/>
          {cardCount !== films.length && <ShowMoreButton/>}
        </section>

        <footer className="page-footer">
          <Logo isLight/>
          <Copyright/>
        </footer>
      </div>
    </>
  );
}
