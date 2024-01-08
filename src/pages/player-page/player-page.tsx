import {Link, useParams} from 'react-router-dom';
import {NotFoundPage} from '../not-found-page/not-found-page.tsx';
import {Loader} from '../../components/loader/loader.tsx';
import {fetchFilmAction} from '../../store/api-actions.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useEffect, useRef, useState} from 'react';
import {getFilmsErrorStatus} from '../../store/reducers/data-reducer/selector.ts';
import {getFilm} from '../../store/reducers/film-reducer/selector.ts';
import {getPlayerTimeValue} from '../../utils/time/get-player-time-value.ts';

export function PlayerPage() {
  const dispatch = useAppDispatch();

  const id = useParams().id || '';
  const film = useAppSelector(getFilm);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const isMounted = useRef(false);
  const filmErrorStatus = useAppSelector(getFilmsErrorStatus);

  useEffect(() => {
    if (!isMounted.current) {
      if (!film || film.id !== id) {
        dispatch(fetchFilmAction(id));
      }
      isMounted.current = true;
    }
  }, [id, film, dispatch]);

  const handlePlayButtonClick = () => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = () => {
    const durationTime = videoRef.current?.duration || 0;
    const currentTime = videoRef.current?.currentTime || 0;
    if (durationTime && currentTime) {
      setProgress(currentTime / durationTime * 100);
      setDuration(durationTime - currentTime);
    }
  };

  const handleFullScreenButtonClick = () => {
    if (videoRef.current?.requestFullscreen) {
      videoRef.current?.requestFullscreen();
    }
  };

  if (!film) {
    return <Loader/>;
  }
  if (filmErrorStatus) {
    return <NotFoundPage/>;
  }

  return (
    <div className="player">
      <video
        ref={videoRef}
        src={film.videoLink}
        onTimeUpdate={handleProgressChange}
        className="player__video"
        poster={film.posterImage}
      >
      </video>

      <Link to={`/films/${film.id}/`}>
        <button type="button" className="player__exit">Exit</button>
      </Link>
      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progress} max="100"></progress>
            <div className="player__toggler" style={{left: `${progress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{getPlayerTimeValue(duration)}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={handlePlayButtonClick}>
            {isPlaying ? (
              <svg viewBox="0 0 14 21" width="14" height="21">
                <use xlinkHref="#pause"></use>
              </svg>
            ) : (
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>
            )}
          </button>
          <div className="player__name">{film.name}</div>

          <button type="button" className="player__full-screen" onClick={handleFullScreenButtonClick}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}
