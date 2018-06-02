import * as actionTypes from '../sagas/actionTypes';

const initialState = '';

export default function searchReducer(state = initialState, action){

  switch(action.type){
    case actionTypes.SEARCH_TRACKS: 
      return action.payload;
  }

  return state;
}