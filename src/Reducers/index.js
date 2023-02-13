import {userReducer} from './userReducer';
import { combineReducers } from "redux";
import { cartReducer } from './cartReducer';

  const rootReducer = combineReducers({
      user : userReducer,
      cart : cartReducer
})

export default rootReducer;