import { Platform } from "../Platform";
import { ProgramBase } from "../Program/ProgramBase";
import { ProgramDefinitions } from "../Program/ProgramDefinitions";
import { Nginx } from "../Program/Nginx";

export class OrchestratorBase {
    platform: Platform;

    constructor(platform: Platform) {
        this.platform = platform;
    }

    public getProgramOrchestrator(program: ProgramDefinitions) : ProgramBase {
        switch(program) {
            case ProgramDefinitions.NGINX:
                return new Nginx(this.platform);
            default:
                break;
        }
        return new ProgramBase(this.platform);
    }
}