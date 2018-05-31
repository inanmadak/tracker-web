import { combineReducers } from 'redux';
import  trackReducer from '../reducers/trackReducer';

const reducers = combineReducers({
  trackList: trackReducer
})

export default reducers;