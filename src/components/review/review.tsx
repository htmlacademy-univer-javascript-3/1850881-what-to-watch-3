import {removeTime} from '../../utils/time/remove-time.ts';
import {convertDateTime} from '../../utils/time/convert-date-time.ts';
import {Comment} from '../../types/comment.ts';
import {formatRatingScore} from '../../utils/film-rating/format-rating-score.ts';

type ReviewProps = {
  comment: Comment;
}

export function Review({comment}: ReviewProps) {

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{comment.user}</cite>
          <time className="review__date" dateTime={removeTime(comment.date)}>{convertDateTime(comment.date)}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{formatRatingScore(comment.rating)}</div>
    </div>
  );
}
