import {Navigate} from 'react-router-dom';
import {AppRoute} from '../../types/app-route';
import {AuthorizationStatus} from '../../types/authorization-status';

type PrivateRouteProps = {
  children: JSX.Element;
  authorizationStatus: AuthorizationStatus;
};

export function PrivateRoute({children, authorizationStatus}: PrivateRouteProps) {
  return authorizationStatus === AuthorizationStatus.Auth
    ? children
    : <Navigate to={AppRoute.SignIn}/>;
}
