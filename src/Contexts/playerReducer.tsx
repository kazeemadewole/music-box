/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { SET_CURRENT_SONG, TOGGLE_RANDOM, TOGGLE_REPEAT, TOGGLE_PLAYING, SET_SONGS } from './types';

export default (state: any, action: { type: any; data: any }) => {
  switch (action.type) {
    case SET_CURRENT_SONG:
      return {
        ...state,
        currentSong: action.data,
        playing: true,
      };
    case TOGGLE_RANDOM:
      return {
        ...state,
        random: action.data,
      };
    case TOGGLE_REPEAT:
      return {
        ...state,
        repeat: action.data,
      };
    case TOGGLE_PLAYING:
      return {
        ...state,
        playing: action.data,
      };
    case SET_SONGS:
      return {
        ...state,
        songs: action.data,
      };
    default:
      return state;
  }
};
