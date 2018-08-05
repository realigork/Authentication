import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, NO_USER, FORGOT_PASS } from './types';

// TODO rename to signup
export const authUser = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:3090/signup', formProps);

    dispatch({
      type: AUTH_USER,
      payload: response.data.token
    });
    localStorage.setItem('token', response.data.token);
    callback();
  } catch(e) {
    dispatch({ type: AUTH_ERROR, payload: 'Email is in use' })
  }

};

export const signout = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
    payload: ''
  };
};

export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:3090/signin', formProps);

    dispatch({
      type: AUTH_USER,
      payload: response.data.token
    });
    localStorage.setItem('token', response.data.token);
    callback();
  } catch(e) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' })
  }
};

export const forgotPass = (formProps) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:3090/forgot-pass', formProps);
    dispatch({ type: FORGOT_PASS, payload: response.data.resetToken });
  } catch(e) {
    dispatch({ type: NO_USER, payload: 'User does not exist!' })
  }
}