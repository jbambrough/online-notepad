import { combineReducers } from 'redux';
import axios from 'axios';

// Toggle ROOT_URL for local development !!!
//const ROOT_URL = 'http://localhost:8080/api';
const ROOT_URL = '/api';

export const FETCH_NOTES = 'FETCH_NOTES';
export const NOTE_CREATED = 'NOTE_CREATED';
export const NOTE_DELETED = 'NOTE_DELETED';
export const NOTE_RECEIVED = 'NOTE_RECEIVED';

export function fetchNotes() {
  var request = axios.get(ROOT_URL + '/notes');
  return {
    type: FETCH_NOTES,
    payload: request
  }
}

export function createNote(value, callback) {
  var request = axios
    .post(ROOT_URL + '/notes', { note: value })
    .then((res) => callback(res));

  return {
    type: NOTE_CREATED,
    payload: { success: 'true' }
  }
}

export function deleteNote(id, callback) {
  var request = axios
    .delete(`${ROOT_URL}/notes/${id}`)
    .then((res) => callback());
  callback();
  return {
    type: NOTE_DELETED,
    payload: id
  }
}

export function getNote(id, callback) {
  var request = axios
    .get(`${ROOT_URL}/notes/${id}`)
    .then((res) => callback(res));
  return {
    type: NOTE_RECEIVED,
    payload: id
  }
}

export function updateNote(id, value, callback) {
  var request = axios.put(`${ROOT_URL}/notes`, {
    id: id,
    note: value
  })
  .then((res) => callback(res));
  callback();
  return {
    type: NOTE_RECEIVED,
    payload: id
  }
}