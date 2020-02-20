export enum ProgramDefinitions {
    NONE = "none",
    NGINX = "nginx"
}

export function GetProgramDefinition(s: string) {
    switch(s) {
        case "nginx":
            return ProgramDefinitions.NGINX;
        default:
            return ProgramDefinitions.NONE;
    }
}