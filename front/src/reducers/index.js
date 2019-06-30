import {combineReducers} from 'redux';
import authReducer from './authReducer';
import flashReducer from './flashReducer';
import userReducer from './userReducer';

const allReducers = combineReducers({
  auth: authReducer,
  flash: flashReducer,
  user: userReducer,
});

export default allReducers;
