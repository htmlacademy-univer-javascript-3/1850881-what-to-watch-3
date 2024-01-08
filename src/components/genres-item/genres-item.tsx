import {useAppDispatch, useAppSelector} from '../../hooks';
import {getCurrentGenre} from '../../store/reducers/data-reducer/selector.ts';
import {MouseEvent} from 'react';
import {changeGenre} from '../../store/reducers/data-reducer/data-reducer.ts';

type GenresItemProps = {
  genre: string;
}

export function GenresItem({genre}: GenresItemProps) {
  const currentGenre = useAppSelector(getCurrentGenre);
  const dispatch = useAppDispatch();

  const handleClick = (evt: MouseEvent<HTMLAnchorElement>, newGenre: string) => {
    evt.preventDefault();
    dispatch(changeGenre(newGenre));
  };

  return (
    <li
      className={currentGenre === genre ? 'catalog__genres-item catalog__genres-item--active' : 'catalog__genres-item'}
    >
      <a className="catalog__genres-link" onClick={(evt) => handleClick(evt, genre)}>{genre}</a>
    </li>
  );
}
