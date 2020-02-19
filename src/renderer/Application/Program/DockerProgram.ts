import { ProgramBase } from "./ProgramBase";
import { Platform } from "../Platform";
import * as fs from "fs";

export class DockerProgram extends ProgramBase  {
    constructor(platform: Platform) {
        super(platform);
    }

    async GenerateDockerComposeService() : Promise<Array<string>> {
        return fs.readFileSync("./scripts/docker/docker-compose.yml").toString().split('\n');
    }
}