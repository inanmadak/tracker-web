import redux from 'redux';
import * as actionTypes from '../actions/actionTypes';

function trackReducer(state = null, action){

  switch(action.type){
    case actionTypes.LIST_TRACKS: 
      return {...state, tracks: action.payload};
    case actionTypes.SEARCH_TRACKS:
      return {...state, searchResult: action.payload};
    case actionTypes.START_TRACK:
      const tracks = state.tracks.slice(0);
      tracks.push(action.payload);
      return {...state, tracks:tracks};
    default:
      return state;
  }

}

export default trackReducer;