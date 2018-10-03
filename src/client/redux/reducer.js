import {
 USER_ADD,
 USER_ADD_RECEIVE,
 USERS_GET,
 USERS_GET_RECEIVE,
 USER_PUT,
 USER_PUT_RECEIVE,
 USER_DELETE,
 USER_DELETE_RECEIVE
} from './actions';

import store from './store'

const DEFAULT_STATE = {
 loading: true,
 actionLoading: false,
}

export default function users(state = DEFAULT_STATE, action) {
 const {type, payload} = action
 switch (type) {
  case USERS_GET:
   return {
    ...state,
    loading: true,
   };
  case USERS_GET_RECEIVE:
   return {
    ...state,
    loading: false,
    users: payload.items,
    total: payload.total
   };
  case USER_ADD:
   return {
    ...state,
    actionLoading: true,
   };
  case USER_ADD_RECEIVE:
   return {
    ...state,
    users: payload.items,
    total: payload.total,
    actionLoading: false,
   };
  case USER_PUT:
   return {
    ...state,
    actionLoading: true,
   };
  case USER_PUT_RECEIVE:
   return {
    ...state,
    actionLoading: false,
   };
  case USER_DELETE:
   return {
    ...state,
    actionLoading: true,
   };
  case USER_DELETE_RECEIVE:
   return {
    ...state,
    users: payload.items,
    total: payload.total,
    actionLoading: false,
   };
  default:
   return state
 }
}