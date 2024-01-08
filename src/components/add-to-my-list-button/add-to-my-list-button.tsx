import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getAuthStatus} from '../../store/reducers/user-reducer/selector.ts';
import {getFavoriteFilms, getPromoFilm} from '../../store/reducers/data-reducer/selector.ts';
import {AuthorizationStatus} from '../../types/authorization-status.ts';
import {
  fetchFavoriteFilmsAction,
  fetchFilmAction,
  fetchPromoFilmAction,
  postFavoriteFilmAction
} from '../../store/api-actions.ts';
import {AppRoute} from '../../types/app-route.ts';
import {useEffect} from 'react';

type AddInListButtonProps = {
  filmId: string;
  isFavorite: boolean;
}

export function AddToMyListButton({filmId, isFavorite}: AddInListButtonProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authStatus = useAppSelector(getAuthStatus);
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const promoFilm = useAppSelector(getPromoFilm);

  useEffect(() => {
    let isMounted = true;
    if (isMounted && authStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteFilmsAction());
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, isFavorite, authStatus]);

  const handleButtonClick = () => {
    if (authStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.SignIn);
    }

    dispatch(postFavoriteFilmAction({filmId: filmId, status: !isFavorite}));
    dispatch(fetchFilmAction(filmId));
    if (promoFilm && promoFilm.id === filmId) {
      dispatch(fetchPromoFilmAction());
    }
  };

  return (
    <button className="btn btn--list film-card__button" type="button" onClick={handleButtonClick}>
      {
        isFavorite ?
          (
            <svg viewBox="0 0 18 14" width="18" height="14">
              <use xlinkHref="#in-list"></use>
            </svg>
          ) :
          (
            <svg viewBox="0 0 19 20" width="19" height="20">
              <use xlinkHref="#add"></use>
            </svg>
          )
      }
      <span>My list</span>
      <span className="film-card__count">{favoriteFilms.length}</span>
    </button>
  );
}
