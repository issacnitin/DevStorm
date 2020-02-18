import { Platform } from "../Platform";
import { Shell } from "electron";
import { ProgramBase } from "./ProgramBase";

export class Nginx extends ProgramBase {

    constructor(platform: Platform) {
        super(platform);
    }

    async Install() : Promise<boolean> {
        try {
            switch(this.platform) {
                case Platform.Mac:
                    console.log("Executing shell")
                    await this.shell.executeShell("./scripts/unix/nginx/install.sh")
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
}