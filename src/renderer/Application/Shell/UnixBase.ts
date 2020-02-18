import * as sudo from 'sudo-prompt';
import * as process from 'child_process';

interface SudoOptions {
    name : string | undefined,
    icns: string | undefined
}

export class UnixBase {
    sudoOptions: SudoOptions;

    constructor(sudoOptions: SudoOptions) {
        this.sudoOptions = sudoOptions;
    }

    public executeShell(command: string) : Promise<string|null> {
        return new Promise((resolve, reject) => {
            process.exec(command, (error: process.ExecException | null, stdout: string | null, stderr: string | null) => {
                if(error) {
                    reject(stderr);
                }
                resolve(stdout);
            })
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