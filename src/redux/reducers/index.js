import { combineReducers } from 'redux';
import runningWashes from './runningWashesReducer';

export const rootReducer = combineReducers({
  runningWashes
});