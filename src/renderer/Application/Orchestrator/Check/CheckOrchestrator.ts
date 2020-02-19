import { ProgramDefinitions } from "../../Program/ProgramDefinitions";
import { Nginx } from "../../Program/Nginx";
import { Platform } from "../../Platform";
import { ProgramBase } from "../../Program/ProgramBase";
import { OrchestratorBase } from "../OrchestratorBase";

export class CheckOrchestrator extends OrchestratorBase {

    constructor(platform: Platform) {
        super(platform);
    }

    public async check(program: ProgramDefinitions, stdout: any, stderr: any) : Promise<boolean> {
        let orchestrator : ProgramBase = this.GetProgramOrchestrator(program);
        return await orchestrator.Check(stdout, stderr);
    }
}