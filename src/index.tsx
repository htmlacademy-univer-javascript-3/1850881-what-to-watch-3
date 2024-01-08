import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './components/app/app.tsx';
import {store} from './store';
import {checkAuthAction, fetchFilmsAction, fetchPromoFilmAction} from './store/api-actions.ts';
import {resetMainPage} from './store/reducers/data-reducer/data-reducer.ts';
import {Provider} from 'react-redux';
import {browserHistory} from './browser-history.ts';
import {HistoryRouter} from './components/history-router/history-router.tsx';

store.dispatch(fetchFilmsAction());
store.dispatch(fetchPromoFilmAction());
store.dispatch(checkAuthAction());
store.dispatch(resetMainPage());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <App/>
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
