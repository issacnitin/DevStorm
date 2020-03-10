import { Platform } from "../Platform";
import { Unix } from "../Shell/Unix";
import { SudoOptions } from "../Shell/ShellBase";

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
        } as SudoOptions
        switch(this.platform) {
            case Platform.Mac:
                return new Unix(options);
            default:
                break
        }
        return new Unix(options);
    }

    public async GenerateDockerComposeService() : Promise<Array<string>> {
        return [];
    }
}