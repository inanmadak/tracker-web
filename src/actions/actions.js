import * as actionTypes from './actionTypes';
import TrackResource from '../resources/TrackResource';
import { call, put } from 'redux-saga/effects';


export function *listTracks(page = 1, sort = 'asc'){

  try{
    const tracks = yield call(TrackResource.list);
    yield put({type: actionTypes.LIST_TRACKS, payload: tracks});
  }catch(err){
    yield put({type: actionTypes.LIST_TRACKS_FAIL, payload: err})
  }
 
}

export function *startTrack(){
  try{
    const track = yield call(TrackResource.start);
    yield put({type: actionTypes.START_TRACK, payload: track})
  }catch(err){
    yield put({type: actionTypes.START_TRACK_FAIL, payload: err});
  }
}

export function *stopTrack(id){
  try{
    const track = yield call(TrackResource.stop, id);
    yield put({type: actionTypes.STOP_TRACK, payload: track});
  }catch(err){
    yield put({type: actionTypes.STOP_TRACK_FAIL, payload: err});
  }
}

export function *searchTrack(text){
  try{
    const tracks = yield call(TrackResource.search, text);
    yield put({type: actionTypes.SEARCH_TRACKS, payload: tracks});
  }catch(err){
    yield put({type: actionTypes.SEARCH_TRACKS_FAIL, payload: err});
  }
}

export function *deleteTrack(id){
  try{
    const res = yield call(TrackResource.deleteTrack, id);
    yield put({type: actionTypes.SEARCH_TRACKS, payload: res});
  }catch(err){
    yield put({type: actionTypes.SEARCH_TRACKS_FAIL, payload: err});
  }
}