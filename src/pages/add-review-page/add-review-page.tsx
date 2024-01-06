import {Logo} from '../../components/logo/logo.tsx';
import {MyListPageProps} from '../my-list-page/my-list-page.tsx';
import {Link, useParams} from 'react-router-dom';
import {ReviewForm} from '../../components/review-form/review-form.tsx';
import {UserBlock} from '../../components/user-block/user-block.tsx';
import {NotFoundPage} from '../not-found-page/not-found-page.tsx';
import {AppRoute} from '../../types/app-route.ts';

type AddReviewPageProps = MyListPageProps;

export function AddReviewPage({films}: AddReviewPageProps) {
  const {id} = useParams();
  const film = films.find((flm) => flm.id === id);
  if (!film) {
    return <NotFoundPage/>;
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt={film.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo isLight={false}></Logo>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`${AppRoute.Films}/${film.id}`} className="breadcrumbs__link">{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <UserBlock/>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={film.name} width="218" height="327"/>
        </div>
      </div>
      <ReviewForm></ReviewForm>
    </section>
  );
}
