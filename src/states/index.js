/**
 * @TODO: Create Redux store
 */
import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './authUser/reducer';
import isPreloadReducer from './isPreload/reducer';

import { talkDetailReducer } from './talkDetail/reducer';
import talksReducer from './talks/reducer';
import { usersReducer } from './users/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    talks: talksReducer,
    users: usersReducer,
    talkDetail: talkDetailReducer,
  },
});

export default store;
