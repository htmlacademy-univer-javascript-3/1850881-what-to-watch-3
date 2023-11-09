import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './components/app/app.tsx';
import {films, promoFilm} from './mocks/films';
import {genres} from './mocks/genres';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App films={films} promoFilm={promoFilm} genres={genres}/>
  </React.StrictMode>
);
