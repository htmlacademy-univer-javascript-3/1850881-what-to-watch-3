import {AppRoute} from '../../types/app-route.ts';
import {Link} from 'react-router-dom';
import {AuthorizationStatus} from '../../types/authorization-status.ts';
import {logoutAction} from '../../store/api-actions.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getAuthStatus, getUser} from '../../store/reducers/user-reducer/selector.ts';
import {MouseEvent} from 'react';

export function UserBlock() {
  const dispatch = useAppDispatch();

  const authStatus = useAppSelector(getAuthStatus);
  const user = useAppSelector(getUser);

  const handleSignOutClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    authStatus === AuthorizationStatus.Auth ?
      (
        <ul className="user-block">
          <li className="user-block__item">
            <Link to={AppRoute.MyList} className="user-block__link">
              <div className="user-block__avatar">
                <img src={user ? user.avatarUrl : 'img/avatar.jpg'} alt="User avatar" width="63" height="63"/>
              </div>
            </Link>
          </li>
          <li className="user-block__item">
            <Link to={AppRoute.Main} className="user-block__link" onClick={handleSignOutClick}>Sign out</Link>
          </li>
        </ul>
      ) :
      (
        <div className="user-block">
          <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>
        </div>
      )
  );
}
