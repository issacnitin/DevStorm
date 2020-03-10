import { ipcRenderer } from "electron";
import { store } from "../ConfigureStore";

export const START_OPEN_DOCKER_COMPOSE_FILE = "START_OPEN_DOCKER_COMPOSE_FILE";
export interface StartOpenDockerComposeFileAction {
    type: typeof START_OPEN_DOCKER_COMPOSE_FILE
}

export const END_OPEN_DOCKER_COMPOSE_FILE = "END_OPEN_DOCKER_COMPOSE_FILE"
export interface EndOpenDockerComposeFileAction {
    type: typeof END_OPEN_DOCKER_COMPOSE_FILE
}

export type SystemActionTypes = StartOpenDockerComposeFileAction | EndOpenDockerComposeFileAction;

export const startOpenDockerComposeFile = () : StartOpenDockerComposeFileAction => {
    ipcRenderer.sendSync('syncOpenDockerCompose');
    store.dispatch(endOpenDockerComposeFile());
    return {
        type: "START_OPEN_DOCKER_COMPOSE_FILE"
    } as StartOpenDockerComposeFileAction
}

export const endOpenDockerComposeFile = () : EndOpenDockerComposeFileAction => {
    return {
        type: "END_OPEN_DOCKER_COMPOSE_FILE"
    } as EndOpenDockerComposeFileAction;
}