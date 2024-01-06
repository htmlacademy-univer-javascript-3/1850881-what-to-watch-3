import {useState} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../types/app-route.ts';

type FilmCardProps = {
  posterImg: string;
  filmName: string;
  id: string;
}

export function FilmCard({posterImg, filmName, id}: FilmCardProps) {
  const [activeCardId, setActiveCardId] = useState('');

  return (
    <article className="small-film-card catalog__films-card" onMouseOver={() => {
      setActiveCardId(id);
    }}
    >
      <div className="small-film-card__image">
        <img src={posterImg} alt={filmName} width="280" height="175"/>
      </div>
      <h3 className="small-film-card__title">
        {/*TODO delete activeCardId*/}
        <Link to={`${AppRoute.Films}/${id}`} className="small-film-card__link">{filmName} {activeCardId}</Link>
      </h3>
    </article>
  );
}
