import * as actionTypes from '../actionTypes';
import * as sagas from '../index';
import { put, call, take, takeLatest, select } from 'redux-saga/effects';
import * as selectors from '../selectors'

test('watchListTracks test', () => {
  const gen = sagas.watchListTracks();
  const params = {page: 1, sort: 'desc'}

  expect(gen.next().value).toEqual( take(actionTypes.LIST_TRACKS_REQ));

  expect(gen.next(params).value).toEqual(call(sagas.listTracks, {page: 1, sort: 'desc'}));

})

test('watchStartTrack test', () => {
  const gen = sagas.watchStartTrack();
  const params = { description: 'test me'}

  expect(gen.next().value).toEqual(take(actionTypes.START_TRACK_REQ));

  expect(gen.next(params).value).toEqual(call(sagas.startTrack, params))
})

test('watchStopTrack test', () => {
  const gen = sagas.watchStopTrack();
  const params = { id: '123'}

  expect(gen.next().value).toEqual(take(actionTypes.STOP_TRACK_REQ));

  expect(gen.next(params).value).toEqual(call(sagas.stopTrack, params))
})

test('deleteTrackReq test', () => {
  const gen = sagas.watchDeleteTrack();
  const params = { id: '123'}

  expect(gen.next().value).toEqual(take(actionTypes.DELETE_TRACK_REQ));

  expect(gen.next(params).value).toEqual(call(sagas.deleteTrack, params))
})

test('watchSearchTrackReq test', () => {
  test('watchStopTrack test', () => {
    const gen = sagas.watchSearchTrack();
  
    expect(gen.next().value).toEqual(takeLatest(actionTypes.SEARCH_TRACKS_REQ, sagas.searchTrack));

  })
})

test('pageChangeReq test', () => {
  const gen = sagas.pageChangeReq();
  const paramsPage = { to: 'next', sort: 'desc'}
  const paramsList = { page: 1, sort: 'desc'}
  const state = { trackList: { page: 1, sort: 'desc'}}
  
  const selectDesc = gen.next();

  expect(selectDesc.value).toEqual(select(selectors.trackListSelector))

  expect(gen.next(state).value).toEqual(take(actionTypes.PAGE_CHANGE_REQ));

  expect(gen.next(paramsList).value).toEqual(call(sagas.listTracks, paramsList))


  
})