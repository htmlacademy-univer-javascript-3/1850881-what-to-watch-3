import {formatRatingScore} from '../../../utils/film-rating/format-rating-score.ts';
import {getRatingLevel} from '../../../utils/film-rating/get-rating-level.ts';
import {NotFoundPage} from '../../../pages/not-found-page/not-found-page.tsx';
import {useAppSelector} from '../../../hooks';
import {getFilm} from '../../../store/reducers/film-reducer/selector.ts';

export function Overview() {
  const film = useAppSelector(getFilm);
  if (!film) {
    return <NotFoundPage/>;
  }

  return (
    <>
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
    </>
  );
}
