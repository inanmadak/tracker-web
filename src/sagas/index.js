import * as actionTypes from './actionTypes';
import TrackResource from '../resources/TrackResource';
import { call, put, all, takeLatest, select, take } from 'redux-saga/effects';


export function* listTracks(params) {

  try {
    const tracks = yield call(TrackResource.list, params.page, params.sort);
    console.log(tracks);
    yield put({ type: actionTypes.LIST_TRACKS, payload: tracks });
  } catch (err) {
    yield put({ type: actionTypes.LIST_TRACKS_FAIL, err })
  }

}

function* startTrack(params) {
  try {
    const track = yield call(TrackResource.start, params.description);
    yield put({ type: actionTypes.START_TRACK, payload: track })
  } catch (err) {
    yield put({ type: actionTypes.START_TRACK_FAIL, payload: err });
  }
}

function* stopTrack(id) {
  try {
    const track = yield call(TrackResource.stop, id);
    yield put({ type: actionTypes.STOP_TRACK, payload: track });
  } catch (err) {
    yield put({ type: actionTypes.STOP_TRACK_FAIL, payload: err });
  }
}

function* searchTrack(text) {
  try {
    const tracks = yield call(TrackResource.search, text);
    yield put({ type: actionTypes.SEARCH_TRACKS, payload: tracks });
  } catch (err) {
    yield put({ type: actionTypes.SEARCH_TRACKS_FAIL, payload: err });
  }
}

function* deleteTrack(id) {
  try {
    const res = yield call(TrackResource.deleteTrack, id);
    yield put({ type: actionTypes.SEARCH_TRACKS, payload: res });
  } catch (err) {
    yield put({ type: actionTypes.SEARCH_TRACKS_FAIL, payload: err });
  }
}


/** Watchers */

export function* watchListTracks() {

  const { page, sort } = yield take(actionTypes.LIST_TRACKS_REQ)
  yield call(listTracks, { page, sort })

}

export function* watchStartTrack() {
  const { description } = yield take(actionTypes.START_TRACK_REQ);
  yield call(startTrack, {description})
}

export function* watchStopTrack() {
  yield takeLatest(actionTypes.STOP_TRACK_REQ, stopTrack);
}

export function* watchDeleteTrack() {
  yield takeLatest(actionTypes.DELETE_TRACK_REQ, deleteTrack);
}

export function* watchSearchTrack() {
  yield takeLatest(actionTypes.SEARCH_TRACKS_REQ, searchTrack);
}

export function* pageChangeReq() {
  const state = yield select();
  console.log(state);
  const { to, sort } = yield takeLatest(actionTypes.PAGE_CHANGE_REQ);

  if (to === 'next') {
    yield call(listTracks, state.trackList.page + 1)
  } else if (to === 'prev') {
    yield call(listTracks, state.trackList.page - 1);
  }
}

// export function* watchPageChange()

export function* rootSaga() {
  yield all([
    watchListTracks(),
    watchStartTrack(),
    watchDeleteTrack(),
    watchSearchTrack(),
    watchStopTrack()
    // pageChangeReq()
  ])
}