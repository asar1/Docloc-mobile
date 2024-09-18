import {
  SET_USER,
  ALTER_USER,
  ALTER_JUST_USER,
  SET_TOKEN,
  SET_ROLE,
} from '../actions/types';
import { TOKEN, USERDETAIL } from '../../helper/Constant';

const INITIAL_USER = {
  userDetail: {},
  userToken: '',
  loading: true,
  userRole: ''
};

const userReducer = (state = INITIAL_USER, action) => {
  console.log(action, "this is actions");
  switch (action.type) {
    case SET_USER:
      console.log(action.payload, 'payload of user details')
      state = Object.assign({}, state, {
        userDetail: action.payload,
        loading: false,
      });
      return state;

    case ALTER_USER:
      state = new Object.assign({}, state, {
        userDetail: action.payload.user,
        userToken: action.payload.token,
        loading: false,
      });
      // AsyncStorage.setItem(USERDETAIL, JSON.stringify(action.payload.user));
      // AsyncStorage.setItem(TOKEN, JSON.stringify(action.payload.token));
      return state;

    case ALTER_JUST_USER:
      state = Object.assign({}, state, { userDetail: action.payload });
      // AsyncStorage.setItem(USERDETAIL, JSON.stringify(action.payload));
      return state;

    case SET_TOKEN:
      state = Object.assign({}, state, { userToken: action.payload.token });
      //AsyncStorage.setItem(TOKEN, JSON.stringify(action.payload));
      return state;

    case SET_ROLE:
      state = Object.assign({}, state, { userRole: action.payload.role });
      return state;

    default:
      return state;
  }
};

export default userReducer;
