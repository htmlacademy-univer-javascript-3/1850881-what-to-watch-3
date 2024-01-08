import {ChangeEvent, FormEvent, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getFilm} from '../../store/reducers/film-reducer/selector.ts';
import {NotFoundPage} from '../../pages/not-found-page/not-found-page.tsx';
import {postFilmCommentAction} from '../../store/api-actions.ts';

export function ReviewForm() {
  const navigate = useNavigate();
  const film = useAppSelector(getFilm);
  const dispatch = useAppDispatch();

  const [reviewText, setReviewText] = useState('');
  const [filmRating, setFilmRating] = useState(0);
  if (!film) {
    return <NotFoundPage/>;
  }

  const handleReviewTextChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(evt.target.value);
  };

  const handleFilmRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setFilmRating(Number(evt.target.value));
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(postFilmCommentAction({filmId: film.id, comment: reviewText, rating: filmRating}))
      .then(() => navigate(`/films/${film.id}`));
  };

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleFormSubmit}>
        <div className="rating">
          <div className="rating__stars">
            <input
              className="rating__input"
              id="star-10"
              type="radio"
              name="rating"
              value="10"
              onChange={handleFilmRatingChange}
            />
            <label className="rating__label" htmlFor="star-10">Rating 10</label>

            <input
              className="rating__input"
              id="star-9"
              type="radio"
              name="rating"
              value="9"
              onChange={handleFilmRatingChange}
            />
            <label className="rating__label" htmlFor="star-9">Rating 9</label>

            <input
              className="rating__input"
              id="star-8"
              type="radio"
              name="rating"
              value="8"
              onChange={handleFilmRatingChange}
            />
            <label className="rating__label" htmlFor="star-8">Rating 8</label>

            <input
              className="rating__input"
              id="star-7"
              type="radio"
              name="rating"
              value="7"
              onChange={handleFilmRatingChange}
            />
            <label className="rating__label" htmlFor="star-7">Rating 7</label>

            <input
              className="rating__input"
              id="star-6"
              type="radio"
              name="rating"
              value="6"
              onChange={handleFilmRatingChange}
            />
            <label className="rating__label" htmlFor="star-6">Rating 6</label>

            <input
              className="rating__input"
              id="star-5"
              type="radio"
              name="rating"
              value="5"
              onChange={handleFilmRatingChange}
            />
            <label className="rating__label" htmlFor="star-5">Rating 5</label>

            <input
              className="rating__input"
              id="star-4"
              type="radio"
              name="rating"
              value="4"
              onChange={handleFilmRatingChange}
            />
            <label className="rating__label" htmlFor="star-4">Rating 4</label>

            <input
              className="rating__input"
              id="star-3"
              type="radio"
              name="rating"
              value="3"
              onChange={handleFilmRatingChange}
            />
            <label className="rating__label" htmlFor="star-3">Rating 3</label>

            <input
              className="rating__input"
              id="star-2"
              type="radio"
              name="rating"
              value="2"
              onChange={handleFilmRatingChange}
            />
            <label className="rating__label" htmlFor="star-2">Rating 2</label>

            <input
              className="rating__input"
              id="star-1"
              type="radio"
              name="rating"
              value="1"
              onChange={handleFilmRatingChange}
            />
            <label className="rating__label" htmlFor="star-1">Rating 1</label>
          </div>
        </div>

        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            name="review-text" id="review-text"
            placeholder="Review text"
            onChange={handleReviewTextChange}
            value={reviewText}
            minLength={50}
            maxLength={400}
          >
          </textarea>
          <div className="add-review__submit">
            <button
              className="add-review__btn"
              type="submit"
              disabled={!filmRating || !reviewText || reviewText.length < 50 || reviewText.length > 400}
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
