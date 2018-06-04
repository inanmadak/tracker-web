export const LIST_TRACKS = 'LIST_TRACKS';
export const LIST_TRACKS_REQ = 'LIST_TRACKS_REQ';
export const LIST_TRACKS_FAIL = 'LIST_TRACKS_FAIL';

export const SEARCH_TRACKS = 'SEARCH_TRACKS';
export const SEARCH_TRACKS_REQ = 'SEARCH_TRACKS_REQ';
export const SEARCH_TRACKS_FAIL = 'SEARCH_TRACKS_FAIL';

export const START_TRACK = 'START_TRACK';
export const START_TRACK_REQ = 'START_TRACK_REQ';
export const START_TRACK_FAIL = 'START_TRACK_FAIL';

export const STOP_TRACK = 'STOP_TRACK';
export const STOP_TRACK_REQ = 'STOP_TRACK_REQ';
export const STOP_TRACK_FAIL = 'STOP_TRACK_FAIL';

export const DELETE_TRACK = 'DELETE_TRACK';
export const DELETE_TRACK_REQ = 'DELETE_TRACK_REQ';
export const DELETE_TRACK_FAIL = 'DELETE_TRACK_FAIL';

export const PAGE_CHANGE_REQ = 'PAGE_CHANGE_REQ';
export const PAGE_CHANGE = 'PAGE_CHANGE';
export const PAGE_CHANGE_FAIL = 'PAGE_CHANGE_FAIL';

export const startTrackReq = (description, booktime = '') => ({
  type: START_TRACK_REQ,
  description,
  booktime
})

export const stopTrackReq = (id) => ({ type: STOP_TRACK_REQ, id})

export const deleteTrackReq = (id) => ({ type: DELETE_TRACK_REQ, id})

export const listTracksReq = (page = 1, sort = 'desc') => ({ type: LIST_TRACKS_REQ, page, sort})

export const searchTracksReq = (text, page = 1, sort = 'desc') => ({ type: SEARCH_TRACKS_REQ, text, page, sort})

export const pageChangeReq = (to = 'next', sort = 'desc') => { return { type: PAGE_CHANGE_REQ, to, sort}}