import { DockerComposeOrchestrator } from "./Orchestrator/DockerCompose/DockerComposeOrchestrator";
import { CheckOrchestrator } from "./Orchestrator/Check/CheckOrchestrator";
import { Platform } from "./Platform";

export class DevConsole {
    DockerComposeOrchestrator: DockerComposeOrchestrator;
    CheckOrchestrator: CheckOrchestrator;
    
    constructor(platform: Platform) {
        this.DockerComposeOrchestrator = new DockerComposeOrchestrator(platform);
        this.CheckOrchestrator = new CheckOrchestrator(platform);
    }
}