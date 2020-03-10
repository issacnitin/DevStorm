import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { systemReducer } from "./System/SystemReducer";
import { AppActions } from "./Actions";

export const rootReducer = combineReducers({
    System: systemReducer
});

export type AppState = ReturnType<typeof rootReducer>

export const store = createStore(
    rootReducer, 
    applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
);