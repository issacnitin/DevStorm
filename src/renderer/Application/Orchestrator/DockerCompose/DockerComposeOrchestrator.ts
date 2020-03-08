import { ProgramDefinitions } from "../../Program/ProgramDefinitions";
import { Platform } from "../../Platform";
import { ProgramBase } from "../../Program/ProgramBase";
import { OrchestratorBase } from "../OrchestratorBase";
import * as fs from "fs";
import { DockerComposeParser } from "./DockerComposeParser";

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

    public async ReadDockerCompose(file: string) {
        let content = fs.readFileSync(file).toString();
        let dockerComposeParser : DockerComposeParser = new DockerComposeParser(content);
        return dockerComposeParser.Parse();
    }
}