import axios from 'axios';
import { AUTH_USER } from './types';

export const authUser = (formProps) => dispatch => {
  axios.post('http://localhost:3090/signup', formProps);
}