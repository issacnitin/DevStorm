import { ProgramDefinitions } from "../../Program/ProgramDefinitions";
import { Nginx } from "../../Program/Nginx";
import { Platform } from "../../Platform";
import { ProgramBase } from "../../Program/ProgramBase";

export class InstallOrchestrator {
    platform: Platform;

    constructor(platform: Platform) {
        this.platform = platform;
    }

    public async install(program: ProgramDefinitions) : Promise<boolean> {
        let orchestrator : ProgramBase = this.getProgramOrchestrator(program);
        return await orchestrator.Install();
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