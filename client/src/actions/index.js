import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

export const authUser = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:3090/signup', formProps);

    dispatch({
      type: AUTH_USER,
      payload: response.data.token
    });
    callback();
  } catch(e) {
    dispatch({ type: AUTH_ERROR, payload: 'Email is in use' })
  }

}