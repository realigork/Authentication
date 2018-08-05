import { AUTH_USER, AUTH_ERROR, NO_USER, FORGOT_PASS } from '../actions/types';

const INITIAL_STATE = {
  authenticated: '',
  errorMsg: ''
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: action.payload };
    case AUTH_ERROR:
      return { ...state, errorMsg: action.payload };
    case NO_USER:
      return { ...state, errorMsg: action.payload, resetToken: null };
    case FORGOT_PASS:
      return { ...state, errorMsg: null, resetToken: action.payload, email: action.email }
    default:
      return state;
  }
}