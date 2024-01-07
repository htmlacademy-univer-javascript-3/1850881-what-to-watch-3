import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../types/app-route.ts';
import {Film} from '../../types/film.ts';
import {PLAY_VIDEO_MILLISECONDS_DELAY} from '../../constants.ts';
import {VideoPlayer} from '../video-player/video-player.tsx';

type FilmCardProps = {
  film: Film;
}

export function FilmCard({film}: FilmCardProps) {
  const [isVideoNeedToPlay, setIsVideoNeedToPlay] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  useEffect(() => {
    let needUpdate = true;
    if (isVideoNeedToPlay) {
      setTimeout(() => needUpdate && setIsVideoPlaying(true), PLAY_VIDEO_MILLISECONDS_DELAY);
    }
    return () => {
      needUpdate = false;
    };
  }, [isVideoNeedToPlay]);

  const mouseEnterHandler = () => {
    setIsVideoNeedToPlay(true);
  };
  const mouseLeaveHandler = () => {
    setIsVideoNeedToPlay(false);
    setIsVideoPlaying(false);
  };

  return (
    <Link
      className="small-film-card__link small-film-card catalog__films-card"
      to={`${AppRoute.Films}/${film.id}`}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <VideoPlayer src={film.videoLink} poster={film.posterImage} isPlaying={isVideoPlaying} muted/>
      {!isVideoPlaying && <h3 className="small-film-card__title">{film.name}</h3>}
    </Link>
  );
}
