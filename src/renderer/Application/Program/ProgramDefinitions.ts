export enum ProgramDefinitions {
    CUSTOM = "custom",
    NGINX = "nginx"
}

export function GetProgramDefinition(s: string) {
    switch(s) {
        case "nginx":
            return ProgramDefinitions.NGINX;
        default:
            return ProgramDefinitions.CUSTOM;
    }
}