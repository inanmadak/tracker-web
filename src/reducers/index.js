import { combineReducers } from 'redux';
import  trackReducer from '../reducers/trackReducer';

const reducers = combineReducers({
  tracks: trackReducer,
  searchResult: trackReducer
})

export default reducers;