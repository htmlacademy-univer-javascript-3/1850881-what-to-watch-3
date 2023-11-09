import {Link} from 'react-router-dom';
import {AppRoute} from '../../types/app-route';

export function NotFoundPage() {
  return (
    <>
      <p>404 Not Found</p>
      <Link to={AppRoute.Main}>To Main Page</Link>
    </>
  );
}
