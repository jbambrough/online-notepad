import { FETCH_NOTES, NOTE_CREATED, NOTE_DELETED } from "../actions/index";

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_NOTES:
      return [action.payload.data, ...state];
    case NOTE_DELETED:
      return [state[0], state];
  }

  return state;
}