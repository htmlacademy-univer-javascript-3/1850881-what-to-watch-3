import {Copyright} from '../../components/copyright/copyright.tsx';
import {Logo} from '../../components/logo/logo.tsx';
import {UserBlock} from '../../components/user-block/user-block.tsx';
import {useParams} from 'react-router-dom';
import {NotFoundPage} from '../not-found-page/not-found-page.tsx';
import {MyListPageProps} from '../my-list-page/my-list-page.tsx';
import {FilmList} from '../../components/film-list/film-list.tsx';
import {PlayButton} from '../../components/play-button/play-button.tsx';
import {AddToMyListButton} from '../../components/add-to-my-list-button/add-to-my-list-button.tsx';
import {getRatingLevel} from '../../utils/film-rating/get-rating-level.ts';
import {formatRatingScore} from '../../utils/film-rating/format-rating-score.ts';
import {AuthorizationStatus} from '../../types/authorization-status.ts';
import {AppRoute} from '../../types/app-route.ts';
import {Link} from 'react-router-dom';

type FilmPageProps = MyListPageProps;

export function FilmPage({films}: FilmPageProps) {
  const authStatus = AuthorizationStatus.Auth;
  const {id} = useParams();
  const film = films.find((flm) => flm.id === id);
  if (!film) {
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
                <PlayButton/>
                <AddToMyListButton/>
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

            <div className="film-card__desc">
              <nav className="film-nav film-card__nav">
                <ul className="film-nav__list">
                  <li className="film-nav__item film-nav__item--active">
                    <a href="#" className="film-nav__link">Overview</a>
                  </li>
                  <li className="film-nav__item">
                    <a href="#" className="film-nav__link">Details</a>
                  </li>
                  <li className="film-nav__item">
                    <a href="#" className="film-nav__link">Reviews</a>
                  </li>
                </ul>
              </nav>

              <div className="film-rating">
                <div className="film-rating__score">{formatRatingScore(film.rating)}</div>
                <p className="film-rating__meta">
                  <span className="film-rating__level">{getRatingLevel(film.rating)}</span>
                  <span className="film-rating__count">{film.scoresCount} ratings</span>
                </p>
              </div>

              <div className="film-card__text">
                <p>{film.description}</p>

                <p className="film-card__director"><strong>Director: {film.director}</strong></p>

                <p className="film-card__starring">
                  <strong>Starring: {film.starring.slice(0, 4).join(', ')} and other</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmList films={films.slice(0, 9)}></FilmList>
        </section>

        <footer className="page-footer">
          <Logo isLight/>
          <Copyright/>
        </footer>
      </div>
    </>
  );
}
