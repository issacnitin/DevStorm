import { ProgramDefinitions } from "../../Program/ProgramDefinitions";
import { Platform } from "../../Platform";
import { ProgramBase } from "../../Program/ProgramBase";
import { OrchestratorBase } from "../OrchestratorBase";

export class DockerComposeOrchestrator extends OrchestratorBase {

    constructor(platform: Platform) {
        super(platform);
    }

    public async GenerateDockerComposeService(program: ProgramDefinitions, stdout: any, stderr: any) : Promise<string> {
        let orchestrator : ProgramBase = this.GetProgramOrchestrator(program);
        return await orchestrator.GenerateDockerComposeService();
    }
}