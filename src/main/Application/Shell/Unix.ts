import * as sudo from 'sudo-prompt';
import * as process from 'child_process';
import { ShellBase, SudoOptions } from "./ShellBase";

export class Unix implements ShellBase {
    sudoOptions: SudoOptions;

    constructor(sudoOptions: SudoOptions) {
        this.sudoOptions = sudoOptions;
    }

    public executeShell(command: string) : Promise<process.ChildProcess> {
        return new Promise((resolve, reject) => {
            let v = process.exec(command, (error: process.ExecException | null, stdout: string | null, stderr: string | null) => {
                if(error) {
                    reject(stderr);
                }
            })
            resolve(v);
        })
    }

    public executeShellElevated(command: string) : Promise<string | null> {
        return new Promise((resolve, reject) => {
            sudo.exec(command, this.sudoOptions, (error: string, stdout: string, stderr: string) => {
                if(!!error) {
                    reject(stderr);
                }
                resolve(stdout);
            })
        });
    }
}