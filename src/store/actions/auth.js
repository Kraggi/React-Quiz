import axios from 'axios';
import { AUTH_SUCCESS, AUTH_LOGOUT } from './actionTypes';

export function auth(email, password, isLogin) {
  return async dispatch => {
    const authData = { email, password, returnSecureToken: true };

    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCmgji_6_V2vWZB3hB-6d-1EI1ZQIkcrMk';

    if (isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCmgji_6_V2vWZB3hB-6d-1EI1ZQIkcrMk';
    }

    const res = await axios.post(url, authData);
    const data = res.data;

    const expirationDate = new Date(
      new Date().getTime() + data.expiresIn * 1000
    );

    localStorage.setItem('token', data.idToken);
    localStorage.setItem('userId', data.localId);
    localStorage.setItem('expirationDate', expirationDate);

    dispatch(authSuccess(data.idToken));
    dispatch(autoLogout(data.expiresIn));
  };
}

export function autoLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.setItem('expirationDate');

  return {
    type: AUTH_LOGOUT,
  };
}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token,
  };
}
