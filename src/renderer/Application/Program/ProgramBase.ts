import { Platform } from "../Platform";
import { Unix } from "../Shell/Unix";

export class ProgramBase {
    platform: Platform;
    shell: Unix;

    constructor(platform: Platform) {
        this.platform = platform;
        this.shell = this.getShell();
    }

    public getShell() : Unix {
        let options = {
            name: undefined,
            icns: undefined
        }
        switch(this.platform) {
            case Platform.Mac:
                return new Unix(options);
            default:
                break
        }
        return new Unix(options);
    }

    public async Install(stdout: any, stderr: any) : Promise<boolean> {
        return false;
    }

    public async Check(stdout: any, stderr: any): Promise<boolean> {
        return false;
    }
}