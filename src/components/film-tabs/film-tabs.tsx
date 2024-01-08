import {Overview} from './overview/overview.tsx';
import {Details} from './details/details.tsx';
import {Reviews} from './reviews/reviews.tsx';
import {FilmTab} from '../../types/film-tab.ts';
import {useState} from 'react';
import {useAppSelector} from '../../hooks';
import {getComments} from '../../store/reducers/film-reducer/selector.ts';

export function FilmTabs() {
  const [currentFilmTab, setCurrentFilmTab] = useState<FilmTab>(FilmTab.Overview);
  const comments = useAppSelector(getComments);

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li
            className={currentFilmTab === FilmTab.Overview ? 'film-nav__item film-nav__item--active' : 'film-nav__item'}
          >
            <a href={`#${FilmTab.Overview}`} className="film-nav__link" onClick={(evt) => {
              evt.preventDefault();
              setCurrentFilmTab(FilmTab.Overview);
            }}
            >
              {FilmTab.Overview}
            </a>
          </li>
          <li
            className={currentFilmTab === FilmTab.Details ? 'film-nav__item film-nav__item--active' : 'film-nav__item'}
          >
            <a href={`#${FilmTab.Details}`} className="film-nav__link" onClick={(evt) => {
              evt.preventDefault();
              setCurrentFilmTab(FilmTab.Details);
            }}
            >
              {FilmTab.Details}
            </a>
          </li>
          <li
            className={currentFilmTab === FilmTab.Reviews ? 'film-nav__item film-nav__item--active' : 'film-nav__item'}
          >
            <a href={`#${FilmTab.Reviews}`} className="film-nav__link" onClick={(evt) => {
              evt.preventDefault();
              setCurrentFilmTab(FilmTab.Reviews);
            }}
            >
              {FilmTab.Reviews}
            </a>
          </li>
        </ul>
      </nav>

      {currentFilmTab === FilmTab.Overview && <Overview/>}
      {currentFilmTab === FilmTab.Details && <Details/>}
      {currentFilmTab === FilmTab.Reviews && <Reviews comments={comments}/>}
    </div>
  );
}
