import redux from 'redux';
import * as actionTypes from '../actions/actionTypes';

export default function(state = null, action){

  switch(action.type){
    case actionList.GET_TRACKS: 
      return {...state, tracks: action.payload};
    case actionList.SEARCH_TRACKS:
      return {...state, searchResult: action.payload};
    case actionList.START_TRACK:
      
  }
}