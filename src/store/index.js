import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import logger from "./middleware";
import monitorReducerEnhancer from "./enhancer";
import rootReducer from "./reducer";
const middlewareEnhancer = applyMiddleware(logger, thunkMiddleware);
const composedEnhancers = compose(middlewareEnhancer, monitorReducerEnhancer);

// const store = createStore(rootReducer, undefined, composedEnhancers);

const configStore = createStore(rootReducer, undefined, composedEnhancers);

export default configStore;
