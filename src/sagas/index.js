import * as actionTypes from './actionTypes';
import TrackResource from '../resources/TrackResource';
import { call, put, all, takeLatest } from 'redux-saga/effects';


export function *listTracks(page = 1, sort = 'asc'){

  try{
    const tracks = yield call(TrackResource.list);
    console.log(tracks);
    yield put({type: actionTypes.LIST_TRACKS, payload: tracks});
  }catch(err){
    yield put({type: actionTypes.LIST_TRACKS_FAIL, err})
  }
 
}

export function* watchListTracks(){
  yield takeLatest(actionTypes.LIST_TRACKS_ASYNC, listTracks);
}

export function* watchStartTrack(){
  yield takeLatest(actionTypes.START_TRACK, startTrack);
}

export function* watchStopTrack(){
  yield takeLatest(actionTypes.STOP_TRACK, stopTrack);
}

export function* watchDeleteTrack(){
  yield takeLatest(actionTypes.DELETE_TRACK, deleteTrack);
}

export function* watchSearchTrack(){
  yield takeLatest(actionTypes.SEARCH_TRACKS, searchTrack);
}

function *startTrack(){
  try{
    const track = yield call(TrackResource.start);
    yield put({type: actionTypes.START_TRACK, payload: track})
  }catch(err){
    yield put({type: actionTypes.START_TRACK_FAIL, payload: err});
  }
}

function *stopTrack(id){
  try{
    const track = yield call(TrackResource.stop, id);
    yield put({type: actionTypes.STOP_TRACK, payload: track});
  }catch(err){
    yield put({type: actionTypes.STOP_TRACK_FAIL, payload: err});
  }
}

function *searchTrack(text){
  try{
    const tracks = yield call(TrackResource.search, text);
    yield put({type: actionTypes.SEARCH_TRACKS, payload: tracks});
  }catch(err){
    yield put({type: actionTypes.SEARCH_TRACKS_FAIL, payload: err});
  }
}

function *deleteTrack(id){
  try{
    const res = yield call(TrackResource.deleteTrack, id);
    yield put({type: actionTypes.SEARCH_TRACKS, payload: res});
  }catch(err){
    yield put({type: actionTypes.SEARCH_TRACKS_FAIL, payload: err});
  }
}

/** Watchers */
export function* rootSaga(){
  yield all([
    watchListTracks(),
    watchStartTrack(),
    watchDeleteTrack(),
    watchSearchTrack(),
    watchStopTrack()
  ])
}