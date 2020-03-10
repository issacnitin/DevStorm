import * as yaml from 'js-yaml';

export class DockerComposeParser {
    fileContents: string;
    
    constructor(fileContents: string) {
        this.fileContents = fileContents;
    }

    public Parse() : any {
        const parsedYaml = yaml.safeLoadAll(this.fileContents);
        return JSON.parse(JSON.stringify(parsedYaml));
    } 
}