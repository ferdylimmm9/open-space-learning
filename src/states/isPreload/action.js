import api from "../../utils/api";
import { setAuthUserActionCreator } from "../authUser/action";

/**
 * @TODO: Define all the actions (creator) for the isPreLoad state
 */
export const ActionType = {
  SET_IS_PRELOAD: "SET_IS_PRELOAD",
};

export function setIsPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

export function asyncPreloadProcess() {
  return async (dispatch) => {
    try {
      // preload process
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      // fallback process
      dispatch(setAuthUserActionCreator(null));
      dispatch(setIsPreloadActionCreator(null));
    } finally {
      // end preload process
      dispatch(setIsPreloadActionCreator(false));
      dispatch(setIsPreloadActionCreator(false));
    }
  };
}
