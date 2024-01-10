import {useAppDispatch} from '../../hooks';
import styles from './error-page.module.css';
import {fetchFavoriteFilmsAction, fetchFilmsAction, fetchPromoFilmAction} from '../../store/api-actions.ts';

export function ErrorPage() {
  const dispatch = useAppDispatch();

  return (
    <>
      <p className={styles.error__text}>Не удалось загрузить страницу</p>
      <button
        onClick={() => {
          dispatch(fetchFilmsAction());
          dispatch(fetchPromoFilmAction());
          dispatch(fetchFavoriteFilmsAction());
        }}
        className={styles.replay}
        type="button"
      >
        Попробовать ещё раз
      </button>
    </>
  );
}
