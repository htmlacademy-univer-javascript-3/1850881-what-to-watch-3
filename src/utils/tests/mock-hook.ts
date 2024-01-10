import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {State} from '../../types/state.ts';
import {createAPI} from '../../services/api.ts';

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({type}) => type);

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;
