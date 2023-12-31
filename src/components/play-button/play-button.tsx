import {Link} from 'react-router-dom';

type PlayButtonProps = {
  filmId: string;
}

export function PlayButton({filmId}: PlayButtonProps) {
  return (
    <Link to={`/player/${filmId}`} className="btn btn--play film-card__button" type="button">
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </Link>
  );
}
