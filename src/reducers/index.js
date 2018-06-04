import { combineReducers } from 'redux';
import  trackReducer from '../reducers/trackReducer';
import searchReducer from '../reducers/searchReducer';

const reducers = combineReducers({
  trackList: trackReducer,
  searchText: searchReducer
})

export default reducers;