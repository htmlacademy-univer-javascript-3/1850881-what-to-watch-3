type GenresItemProps = {
  isActive: boolean;
  url: string;
  genre: string;
}

export function GenresItem({isActive, url, genre}: GenresItemProps) {
  return (
    <li className={isActive ? 'catalog__genres-item catalog__genres-item--active' : 'catalog__genres-item'}>
      <a href={url} className="catalog__genres-link">{genre}</a>
    </li>
  );
}
