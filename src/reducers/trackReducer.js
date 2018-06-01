import redux from 'redux';
import * as actionTypes from '../sagas/actionTypes';

function trackReducer(state = null, action){

  switch(action.type){
    case actionTypes.LIST_TRACKS: 
      console.log(action)
      return action.payload;
    case actionTypes.SEARCH_TRACKS:
      return {...state, searchResult: action.payload};
    case actionTypes.START_TRACK:
      const data = state.data.slice(0);
      data.push(action.payload);
      const news = Object.assign({}, state, {total: state.total + 1, data});
      // news.total++;
      // news.data = data;
      console.log(news)
      return news;
    default:
      return state;
  }

}

export default trackReducer;