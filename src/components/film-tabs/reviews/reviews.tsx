import {comments} from '../../../mocks/comments.ts';
import {Review} from '../../review/review.tsx';

export function Reviews() {
  const firstCommentsHalf = comments.slice(0, comments.length / 2);
  const secondCommentsHalf = comments.slice(comments.length / 2);
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {firstCommentsHalf.map((comment) => <Review key={comment.id} comment={comment}/>)}
      </div>
      <div className="film-card__reviews-col">
        {secondCommentsHalf.map((comment) => <Review key={comment.id} comment={comment}/>)}
      </div>
    </div>
  );
}
