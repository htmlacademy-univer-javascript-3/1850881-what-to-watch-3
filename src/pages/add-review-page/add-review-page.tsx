import {Logo} from '../../components/logo/logo.tsx';
import {Link, useNavigate} from 'react-router-dom';
import {ReviewForm} from '../../components/review-form/review-form.tsx';
import {UserBlock} from '../../components/user-block/user-block.tsx';
import {NotFoundPage} from '../not-found-page/not-found-page.tsx';
import {AppRoute} from '../../types/app-route.ts';
import {useAppSelector} from '../../hooks';
import {getAuthStatus} from '../../store/reducers/user-reducer/selector.ts';
import {useEffect} from 'react';
import {AuthorizationStatus} from '../../types/authorization-status.ts';
import {getFilm} from '../../store/reducers/film-reducer/selector.ts';

export function AddReviewPage() {
  const film = useAppSelector(getFilm);
  const authStatus = useAppSelector(getAuthStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (authStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.SignIn);
    }
  }, [authStatus, navigate]);

  if (!film) {
    return <NotFoundPage/>;
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt={film.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo isLight={false}></Logo>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`${AppRoute.Films}/${film.id}`} className="breadcrumbs__link">{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <UserBlock/>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={film.name} width="218" height="327"/>
        </div>
      </div>
      <ReviewForm></ReviewForm>
    </section>
  );
}
