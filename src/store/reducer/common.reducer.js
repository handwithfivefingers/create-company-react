import { SIDEBAR_COLLAPSE } from "../type/common.type";
const initState = {
  collapsed: false,
};

export default function commonReducer(state = initState, action) {
  switch (action.type) {
    case SIDEBAR_COLLAPSE.COLLAPSED:
      return { ...state, collapsed: true };
    case SIDEBAR_COLLAPSE.EXPANDED:
      return { ...state, collapsed: false };
    default:
      return state;
  }
}
