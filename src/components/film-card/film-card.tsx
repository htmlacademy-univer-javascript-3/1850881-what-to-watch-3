import {useState} from 'react';
import {Link} from 'react-router-dom';

type FilmCardProps = {
  posterImg: string;
  filmName: string;
  id: number;
}

export function FilmCard({posterImg, filmName, id}: FilmCardProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setActiveCardId] = useState(0);

  return (
    <article className="small-film-card catalog__films-card" onMouseOver={() => setActiveCardId(id)}>
      <div className="small-film-card__image">
        <img src={posterImg} alt={filmName} width="280" height="175"/>
      </div>
      <h3 className="small-film-card__title">
        <Link to={`/films/${id}`} className="small-film-card__link">{filmName}</Link>
      </h3>
    </article>
  );
}
