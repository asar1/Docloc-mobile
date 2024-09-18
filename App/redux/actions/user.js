import {SET_USER, ALTER_USER, ALTER_JUST_USER, SET_TOKEN, SET_ROLE} from './types';

function setUser(user) {
  console.log("going to add user", user)
  return dispatch => {
    dispatch({type: SET_USER, payload: user});
  };
}
function setToken(token) {
  return dispatch => {
    dispatch({type: SET_TOKEN, payload: token});
  };
}
function setRole(role) {
  console.log("going to set role => ", role);
  return dispatch => {
    dispatch({type: SET_ROLE, payload: role});
  };
}

function alterUser(user) {
  return dispatch => {
    dispatch({type: ALTER_USER, payload: user});
  };
}
function alterJustUser(user) {
  return dispatch => {
    dispatch({type: ALTER_JUST_USER, payload: user});
  };
}

export {setUser, alterUser, alterJustUser, setToken, setRole};
