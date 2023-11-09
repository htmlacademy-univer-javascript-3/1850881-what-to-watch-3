import {Logo} from '../../components/logo/logo.tsx';
import {MyListPageProps} from '../my-list-page/my-list-page.tsx';
import {useParams} from 'react-router-dom';
import {ReviewForm} from '../../components/review-form/review-form.tsx';

type AddReviewPageProps = MyListPageProps;

export function AddReviewPage({films}: AddReviewPageProps) {
  const {id} = useParams();
  const filmId = Number(id);
  const film = films.at(filmId - 1);

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film?.posterImg} alt={film?.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo isLight={false}></Logo>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a href="film-page.html" className="breadcrumbs__link">{film?.name}</a>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link">Sign out</a>
            </li>
          </ul>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film?.posterImg} alt={film?.name} width="218" height="327"/>
        </div>
      </div>
      <ReviewForm></ReviewForm>
    </section>
  );
}
