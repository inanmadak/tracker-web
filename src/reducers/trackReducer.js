import * as actionTypes from '../sagas/actionTypes';

const initialState = { page: 1, data: []};

function trackReducer(state = initialState, action){

  let data = [];

  switch(action.type){
    case actionTypes.LIST_TRACKS: 
      action.payload.page = parseInt(action.payload.page);
      return action.payload;
    case actionTypes.START_TRACK:
      data = state.data.slice(0);
      data.unshift(action.payload);
      const news = Object.assign({}, state, {total: state.total + 1, data});
      return news;
    case actionTypes.STOP_TRACK:
      data = state.data.slice(0);
      data.forEach((item, index, arr) => {
        if(item._id == action.payload._id){
          arr[index] = action.payload;
        }
      })

      return {...state, data};
    case actionTypes.DELETE_TRACK:
      if(action.payload.status){
        data = state.data.slice(0);
        let index = -1;
        

        data.forEach((item, i, arr) => {
          if(item._id == action.payload.id){
            index = i;
          }
        })

        data.splice(index, 1);
        return {...state, data};
      }

      return state;
    default:
      return state;
  }

}

export default trackReducer;