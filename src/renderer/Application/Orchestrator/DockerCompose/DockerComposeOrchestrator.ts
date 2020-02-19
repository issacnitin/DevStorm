import { ProgramDefinitions } from "../../Program/ProgramDefinitions";
import { Platform } from "../../Platform";
import { ProgramBase } from "../../Program/ProgramBase";
import { OrchestratorBase } from "../OrchestratorBase";

export class DockerComposeOrchestrator extends OrchestratorBase {

    constructor(platform: Platform) {
        super(platform);
    }

    public async GenerateDockerComposeService(programs: Array<ProgramDefinitions>, stdout: any, stderr: any) : Promise<string> {
        let dockerCompose: Array<string> = ["version: '3'", "services:"];
        for(let program of programs) {
            let orchestrator : ProgramBase = this.GetProgramOrchestrator(program);
            let lines = await orchestrator.GenerateDockerComposeService();
            for(let line of lines) {
                dockerCompose.push("  " + line)
            }
        }
        return dockerCompose.reduce((a, b) => {
            return a + "\n" + b;
        })
    }
}