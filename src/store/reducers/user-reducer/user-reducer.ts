import {AuthorizationStatus} from '../../../types/authorization-status.ts';
import {UserState} from '../../../types/state.ts';
import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../../constants.ts';
import {checkAuthAction, loginAction, logoutAction} from '../../api-actions.ts';
import {dropToken, saveToken} from '../../../services/token.ts';

const initialState: UserState = {
  user: null,
  authStatus: AuthorizationStatus.Unknown,
};

export const userReducer = createSlice({
  name: NameSpace.User,
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.user = null;
        state.authStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authStatus = AuthorizationStatus.Auth;
        saveToken(action.payload.token);
      })
      .addCase(loginAction.rejected, (state) => {
        state.user = null;
        state.authStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.user = null;
        state.authStatus = AuthorizationStatus.NoAuth;
        dropToken();
      })
      .addCase(logoutAction.rejected, (state) => {
        state.user = null;
        state.authStatus = AuthorizationStatus.NoAuth;
      });
  },
});
