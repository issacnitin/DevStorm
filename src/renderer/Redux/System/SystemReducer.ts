import { SystemState } from "./SystemState";
import { SystemActionTypes } from "./SystemActions";

const systemReducerDefaultState: SystemState = {
    dockerComposeFile: ""
} as SystemState;

const systemReducer = (state = systemReducerDefaultState, action: SystemActionTypes) => {
    switch(action.type) {
        case "START_OPEN_DOCKER_COMPOSE_FILE":
            return Object.assign({}, state)
        case "END_OPEN_DOCKER_COMPOSE_FILE":
            return Object.assign({}, state);
        default:
            return state;
    }
}

export {systemReducer}