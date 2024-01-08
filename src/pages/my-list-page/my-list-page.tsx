import {Logo} from '../../components/logo/logo.tsx';
import {FilmList} from '../../components/film-list/film-list.tsx';
import {Copyright} from '../../components/copyright/copyright.tsx';
import {UserBlock} from '../../components/user-block/user-block.tsx';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getFavoriteFilms} from '../../store/reducers/data-reducer/selector.ts';
import {getAuthStatus} from '../../store/reducers/user-reducer/selector.ts';
import {AuthorizationStatus} from '../../types/authorization-status.ts';
import {AppRoute} from '../../types/app-route.ts';
import {useEffect} from 'react';
import {fetchFavoriteFilmsAction} from '../../store/api-actions.ts';

export function MyListPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const authStatus = useAppSelector(getAuthStatus);
  if (authStatus !== AuthorizationStatus.Auth) {
    navigate(AppRoute.SignIn);
  }

  useEffect(() => {
    if (authStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.SignIn);
    }
    if (authStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteFilmsAction());
    }
  }, [authStatus, navigate, dispatch]);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo isLight={false}></Logo>

        <h1 className="page-title user-page__title">
          My list <span className="user-page__film-count">{favoriteFilms.length}</span>
        </h1>
        <UserBlock/>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <FilmList films={favoriteFilms}></FilmList>
      </section>

      <footer className="page-footer">
        <Logo isLight></Logo>
        <Copyright></Copyright>
      </footer>
    </div>
  );
}
