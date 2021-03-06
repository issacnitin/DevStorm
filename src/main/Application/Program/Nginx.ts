import { Platform } from "../Platform";
import { ProgramBase } from "./ProgramBase";
import * as fs from 'fs';

export class Nginx extends ProgramBase {

    constructor(platform: Platform) {
        super(platform);
    }

    async GenerateDockerComposeService() : Promise<Array<string>> {
        return fs.readFileSync("./scripts/nginx/docker-compose.yml").toString().split('\n');
    }

    async Install(stdout: any, stderr: any) : Promise<boolean> {
        try {
            switch(this.platform) {
                case Platform.Mac:
                    console.log("Executing shell")
                    let v = await this.shell.executeShell("./scripts/unix/nginx/install.sh")
                    v.stdout?.on('data', stdout);
                    v.stderr?.on('data', stderr);
                    break;
                case Platform.Windows:
                    break;
                default:
                    break;
            }
            return true;
        } catch (error) {
            console.error(error)
            return false;
        }
    }

    async Check(stdout: any, stderr: any) : Promise<boolean> {
        try {
            switch(this.platform) {
                case Platform.Mac:
                    let v = await this.shell.executeShell("./scripts/unix/nginx/check.sh")
                    v.stdout?.on('data', stdout);
                    v.stderr?.on('data', stderr);
                    break;
                default:
                    break;
            }
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}