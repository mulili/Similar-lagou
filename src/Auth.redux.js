
import Const from './const';

const initState = {
  user: 'Muli',
  age: 26,
  isAuth: false
};
const auth = (state = initState, action) => {
  switch (action.type) {
    case Const.LOGIN:
      return { ...state, isAuth: true };
    case Const.LOGOUT:
      return { ...state, isAuth: false };
    default:
      return state;
  }
};

export default auth;
