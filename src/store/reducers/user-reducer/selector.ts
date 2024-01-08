import {State} from '../../../types/state.ts';
import {NameSpace} from '../../../constants.ts';
import {User} from '../../../types/user.ts';
import {AuthorizationStatus} from '../../../types/authorization-status.ts';

export const getUser = (state: Pick<State, NameSpace.User>): User | null => state[NameSpace.User].user;
export const getAuthStatus = (state: Pick<State, NameSpace.User>): AuthorizationStatus => state[NameSpace.User].authStatus;
export const getAuthCheckedStatus = (state: Pick<State, NameSpace.User>): boolean => state[NameSpace.User].authStatus !== AuthorizationStatus.Unknown;
