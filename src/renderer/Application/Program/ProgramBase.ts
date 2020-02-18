import { Platform } from "../Platform";
import { UnixBase } from "../Shell/UnixBase";

export class ProgramBase {
    platform: Platform;
    shell: UnixBase;

    constructor(platform: Platform) {
        this.platform = platform;
        this.shell = this.getShell();
    }

    public getShell() : UnixBase {
        let options = {
            name: undefined,
            icns: undefined
        }
        switch(this.platform) {
            case Platform.Mac:
                return new UnixBase(options);
            default:
                break
        }
        return new UnixBase(options);
    }

    public async Install() : Promise<boolean> {
        return false;
    }
}