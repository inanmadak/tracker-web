import * as actionTypes from './actionTypes';
import TrackResource from '../resources/TrackResource';
import { delay } from 'redux-saga';
import { call, put, all, takeLatest, select, take } from 'redux-saga/effects';
import * as selectors from './selectors';


export function* listTracks(params) {

  try {
    const state = yield select();
    const tracks = yield call(TrackResource.list, params.page, params.sort, state.searchText);
    yield put({ type: actionTypes.LIST_TRACKS, payload: tracks });
  } catch (err) {
    yield put({ type: actionTypes.LIST_TRACKS_FAIL, err })
  }

}

export function* startTrack(params) {
  try {
    const track = yield call(TrackResource.start, params.description, params.booktime);
    yield put({ type: actionTypes.START_TRACK, payload: track })
  } catch (err) {
    yield put({ type: actionTypes.START_TRACK_FAIL, payload: err });
  }
}

export function* stopTrack(params) {
  try {
    const track = yield call(TrackResource.stop, params.id);
    yield put({ type: actionTypes.STOP_TRACK, payload: track });
  } catch (err) {
    yield put({ type: actionTypes.STOP_TRACK_FAIL, payload: err });
  }
}

export function* searchTrack(params) {
  try {
    yield delay(300);
    yield put({type: actionTypes.SEARCH_TRACKS, payload: params.text})
    const tracks = yield call(listTracks, params.page, params.sort, params.text);

  } catch (err) {
    yield put({ type: actionTypes.SEARCH_TRACKS_FAIL, payload: err });
  }
}

export function* deleteTrack(params) {
  try {
    const res = yield call(TrackResource.delete, params.id);
    yield put({ type: actionTypes.DELETE_TRACK, payload: res });
  } catch (err) {
    yield put({ type: actionTypes.DELETE_TRACK_FAIL, payload: err });
  }
}


/** Watchers */

export function* watchListTracks() {

  while(true){
    const { page, sort } = yield take(actionTypes.LIST_TRACKS_REQ)
    yield call(listTracks, { page, sort });
  }
  

}

export function* watchStartTrack() {
  while(true){
    const { description, booktime } = yield take(actionTypes.START_TRACK_REQ);
    yield call(startTrack, {description, booktime})
  }
  
}

export function* watchStopTrack() {
  while(true){
    const { id } = yield take(actionTypes.STOP_TRACK_REQ);
    yield call(stopTrack, { id })
  }
  
}

export function* watchDeleteTrack() {
  while(true){
    const { id } = yield take(actionTypes.DELETE_TRACK_REQ);
    yield call(deleteTrack, {id})
  }
}

export function* watchSearchTrack() {

  yield takeLatest(actionTypes.SEARCH_TRACKS_REQ, searchTrack);
  /* while(true){
    const { text, page, sort } = yield take(actionTypes.SEARCH_TRACKS_REQ);
    yield throttle(500, actionTypes.SEARCH_TRACKS_REQ, searchTrack, { text, page, sort })
    //yield call(searchTrack, { text, page, sort })
  }*/
}

export function* pageChangeReq(params) {
  let p = 1;

  while(true){

    const state = yield select();

    const { to, sort } = yield take(actionTypes.PAGE_CHANGE_REQ);

    //TODO: API always returns 10 per page. For now harcoded.
    if (to === 'next') {
      p = (state.trackList.page < state.trackList.total) ? (state.trackList.page + 1) : state.trackList.total;
      yield call(listTracks, {page: p, sort: sort})
    } else {
      p = (state.trackList.page > 1) ? (state.trackList.page - 1) : 1;
      yield call(listTracks, {page: p, sort: sort});
    }
  }
  
}

// export function* watchPageChange()

export function* rootSaga() {
  yield all([
    watchListTracks(),
    watchStartTrack(),
    watchDeleteTrack(),
    watchSearchTrack(),
    watchStopTrack(),
    pageChangeReq()
  ])
}