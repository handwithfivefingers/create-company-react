import { SIDEBAR_COLLAPSE } from "../type/common.type";

export const sideCollapsed = (type) => {
  return async (dispatch) => {
    if (type) {
      // collapsed = true
      dispatch({
        type: SIDEBAR_COLLAPSE.COLLAPSED,
      });
    } else {
      // collapsed = false
      dispatch({
        type: SIDEBAR_COLLAPSE.EXPANDED,
      });
    }
  };
};
