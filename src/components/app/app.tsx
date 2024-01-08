import {MainPage} from '../../pages/main-page/main-page.tsx';
import {Route, Routes} from 'react-router-dom';
import {NotFoundPage} from '../../pages/not-found-page/not-found-page.tsx';
import {AppRoute} from '../../types/app-route.ts';
import {SignInPage} from '../../pages/sign-in-page/sign-in-page.tsx';
import {FilmPage} from '../../pages/film-page/film-page.tsx';
import {AddReviewPage} from '../../pages/add-review-page/add-review-page.tsx';
import {PlayerPage} from '../../pages/player-page/player-page.tsx';
import {PrivateRoute} from '../private-route/private-route.tsx';
import {MyListPage} from '../../pages/my-list-page/my-list-page.tsx';
import {ErrorPage} from '../../pages/error-page/error-page.tsx';
import {Loader} from '../loader/loader.tsx';
import {getFilmsErrorStatus, getFilmsLoadingStatus} from '../../store/reducers/data-reducer/selector.ts';
import {getAuthCheckedStatus, getAuthStatus} from '../../store/reducers/user-reducer/selector.ts';
import {useAppSelector} from '../../hooks';

export function App() {
  const authStatus = useAppSelector(getAuthStatus);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const isFilmsLoading = useAppSelector(getFilmsLoadingStatus);
  const hasError = useAppSelector(getFilmsErrorStatus);
  if (!isAuthChecked || isFilmsLoading) {
    return <Loader/>;
  }
  if (hasError) {
    return <ErrorPage/>;
  }

  return (
    <Routes>
      <Route path={AppRoute.Main} element={<MainPage/>}/>
      <Route path={AppRoute.SignIn} element={<SignInPage/>}/>
      <Route
        path={AppRoute.MyList}
        element={
          <PrivateRoute authorizationStatus={authStatus}>
            <MyListPage/>
          </PrivateRoute>
        }
      />
      <Route path={`${AppRoute.Films}/:id`}>
        <Route index element={<FilmPage/>}/>
        <Route path={AppRoute.AddReview} element={<AddReviewPage/>}/>
      </Route>
      <Route path={`${AppRoute.Player}/:id`} element={<PlayerPage/>}/>
      <Route path='*' element={<NotFoundPage/>}/>
    </Routes>
  );
}
