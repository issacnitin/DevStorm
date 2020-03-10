import { dialog } from "electron";
import { store } from "../ConfigureStore";

export const START_OPEN_DOCKER_COMPOSE_FILE = "START_OPEN_DOCKER_COMPOSE_FILE";
export interface StartOpenDockerComposeFileAction {
    type: typeof START_OPEN_DOCKER_COMPOSE_FILE
    dockerComposeFile: string
}

export const END_OPEN_DOCKER_COMPOSE_FILE = "END_OPEN_DOCKER_COMPOSE_FILE"
export interface EndOpenDockerComposeFileAction {
    type: typeof END_OPEN_DOCKER_COMPOSE_FILE,
    dockerComposeFile: string
}

export type SystemActionTypes = StartOpenDockerComposeFileAction | EndOpenDockerComposeFileAction;

export const startOpenDockerComposeFile = () : StartOpenDockerComposeFileAction => {
    let file = dialog.showOpenDialog({properties: ["openFile"]})
    store.dispatch(endOpenDockerComposeFile(file[0]));
    return {
        type: "START_OPEN_DOCKER_COMPOSE_FILE",
        dockerComposeFile: ""
    } as StartOpenDockerComposeFileAction
}

export const endOpenDockerComposeFile = (file: string) : EndOpenDockerComposeFileAction => {
    return {
        type: "END_OPEN_DOCKER_COMPOSE_FILE",
        dockerComposeFile: file
    } as EndOpenDockerComposeFileAction;
}