import {Copyright} from '../../components/copyright/copyright.tsx';
import {Logo} from '../../components/logo/logo.tsx';
import {UserBlock} from '../../components/user-block/user-block.tsx';
import {useParams} from 'react-router-dom';
import {NotFoundPage} from '../not-found-page/not-found-page.tsx';
import {FilmList} from '../../components/film-list/film-list.tsx';
import {PlayButton} from '../../components/play-button/play-button.tsx';
import {AddToMyListButton} from '../../components/add-to-my-list-button/add-to-my-list-button.tsx';
import {AuthorizationStatus} from '../../types/authorization-status.ts';
import {AppRoute} from '../../types/app-route.ts';
import {Link} from 'react-router-dom';
import { FilmTabs } from '../../components/film-tabs/film-tabs.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useEffect} from 'react';
import {resetFilmState} from '../../store/reducers/film-reducer/film-reducer.ts';
import {fetchFilmAction, fetchFilmCommentsAction, fetchSimilarFilmsAction} from '../../store/api-actions.ts';
import {getFilm, getSimilarFilms} from '../../store/reducers/film-reducer/selector.ts';
import {getAuthStatus} from '../../store/reducers/user-reducer/selector.ts';
import {getFilmsErrorStatus} from '../../store/reducers/data-reducer/selector.ts';
import {Loader} from '../../components/loader/loader.tsx';

export function FilmPage() {
  const id = useParams().id || '';
  const dispatch = useAppDispatch();
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(resetFilmState());
      dispatch(fetchFilmCommentsAction(id));
      dispatch(fetchFilmAction(id));
      dispatch(fetchSimilarFilmsAction(id));
    }
    return () => {
      isMounted = false;
    };
  }, [id, dispatch]);
  const film = useAppSelector(getFilm);
  const similarFilms = useAppSelector(getSimilarFilms);
  const authStatus = useAppSelector(getAuthStatus);
  const filmErrorStatus = useAppSelector(getFilmsErrorStatus);
  if (!film) {
    return (
      <Loader/>
    );
  }
  if (filmErrorStatus) {
    return <NotFoundPage/>;
  }

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo isLight={false}/>
            <UserBlock/>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>

              <div className="film-card__buttons">
                <PlayButton filmId={film.id}/>
                <AddToMyListButton filmId={film.id} isFavorite={film.isFavorite}/>
                {
                  authStatus === AuthorizationStatus.Auth &&
                  <Link to={`${AppRoute.Films}/${film.id}/${AppRoute.AddReview}`} className="btn film-card__button">
                    Add review
                  </Link>
                }
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.posterImage} alt={`${film.name} poster`} width="218" height="327"/>
            </div>

            <FilmTabs/>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmList films={similarFilms}></FilmList>
        </section>

        <footer className="page-footer">
          <Logo isLight/>
          <Copyright/>
        </footer>
      </div>
    </>
  );
}
