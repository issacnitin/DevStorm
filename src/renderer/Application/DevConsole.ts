import { InstallOrchestrator } from "./Orchestrator/Install/InstallOrchestrator";
import { CheckOrchestrator } from "./Orchestrator/Check/CheckOrchestrator";
import { Platform } from "./Platform";

export class DevConsole {
    InstallOrchestrator: InstallOrchestrator;
    CheckOrchestrator: CheckOrchestrator;
    
    constructor(platform: Platform) {
        this.InstallOrchestrator = new InstallOrchestrator(platform);
        this.CheckOrchestrator = new CheckOrchestrator(platform);
    }
}