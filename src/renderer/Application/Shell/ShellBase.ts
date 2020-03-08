import * as process from 'child_process';

export interface SudoOptions {
    name : string | undefined,
    icns: string | undefined,
    env: any
}

export interface ShellBase {
    sudoOptions: SudoOptions;
    executeShell(command: string) : Promise<process.ChildProcess>;
    executeShellElevated(command: string) : Promise<string | null>;
}