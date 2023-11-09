import {MainPage, MainScreenProps} from '../../pages/main-page/main-page.tsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {NotFoundPage} from '../../pages/not-found-page/not-found-page.tsx';
import {AppRoute} from '../../types/app-route.ts';
import {SignInPage} from '../../pages/sign-in-page/sign-in-page.tsx';
import {FilmPage} from '../../pages/film-page/film-page.tsx';
import {AddReviewPage} from '../../pages/add-review-page/add-review-page.tsx';
import {PlayerPage} from '../../pages/player-page/player-page.tsx';
import {PrivateRoute} from '../private-route/private-route.tsx';
import {AuthorizationStatus} from '../../types/authorization-status.ts';
import {MyListPage} from '../../pages/my-list-page/my-list-page.tsx';

type AppProps = MainScreenProps;

export function App(props: AppProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage {...props}/>}/>
        <Route path={AppRoute.SignIn} element={<SignInPage/>}/>
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <MyListPage {...props}/>
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Film} element={<FilmPage/>}/>
        <Route path={AppRoute.AddReview} element={<AddReviewPage {...props}/>}/>
        <Route path={AppRoute.Player} element={<PlayerPage {...props}/>}/>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}
