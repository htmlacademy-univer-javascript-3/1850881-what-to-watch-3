import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../../constants.ts';
import {userReducer} from './user-reducer/user-reducer.ts';
import {filmReducer} from './film-reducer/film-reducer.ts';
import {dataReducer} from './data-reducer/data-reducer.ts';

export const reducer = combineReducers({
  [NameSpace.Data]: dataReducer.reducer,
  [NameSpace.User]: userReducer.reducer,
  [NameSpace.Film]: filmReducer.reducer
});
