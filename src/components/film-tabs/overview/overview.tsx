import {Film} from '../../../types/film.ts';
import {formatRatingScore} from '../../../utils/film-rating/format-rating-score.ts';
import {getRatingLevel} from '../../../utils/film-rating/get-rating-level.ts';

export type OverviewProps = {
  film: Film;
}

export function Overview({film}: OverviewProps) {
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
