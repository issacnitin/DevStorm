import { ProgramDefinitions } from "../../Program/ProgramDefinitions";
import { Platform } from "../../Platform";
import { ProgramBase } from "../../Program/ProgramBase";
import { OrchestratorBase } from "../OrchestratorBase";

export class InstallOrchestrator extends OrchestratorBase {

    constructor(platform: Platform) {
        super(platform);
    }

    public async install(program: ProgramDefinitions, stdout: any, stderr: any) : Promise<boolean> {
        let orchestrator : ProgramBase = this.getProgramOrchestrator(program);
        return await orchestrator.Install(stdout, stderr);
    }
}