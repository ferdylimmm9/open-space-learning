import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

/**
 * @TODO: Define all the actions (creator) for the talks state
 */
export const ActionType = {
  RECEIVE_TALKS: 'RECEIVE_TALKS',
  ADD_TALK: 'ADD_TALK',
  TOGGLE_LIKE_TALK: 'TOGGLE_LIKE_TALK',
};

export function receiveTalksActionCreator(talks) {
  return {
    type: ActionType.RECEIVE_TALKS,
    payload: {
      talks,
    },
  };
}

export function addTalkActionCreator(talk) {
  return {
    type: ActionType.ADD_TALK,
    payload: {
      talk,
    },
  };
}

export function toggleLikeTalkActionCreator({ talkId, userId }) {
  return {
    type: ActionType.TOGGLE_LIKE_TALK,
    payload: {
      talkId,
      userId,
    },
  };
}

export function asyncAddTalk({ text, replyTo = '' }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const talk = await api.createTalk({ text, replyTo });
      dispatch(addTalkActionCreator(talk));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export function asyncToogleLikeTalk(talkId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(showLoading());
    try {
      dispatch(toggleLikeTalkActionCreator({ talkId, userId: authUser.id }));

      await api.toggleLikeTalk(talkId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleLikeTalkActionCreator({ talkId, userId: authUser.id }));
    }
    dispatch(hideLoading());
  };
}
