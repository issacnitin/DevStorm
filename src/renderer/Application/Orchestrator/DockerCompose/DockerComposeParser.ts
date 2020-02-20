import * as yaml from 'js-yaml';

export class DockerComposeParser {
    fileContents: string;
    
    constructor(fileContents: string) {
        this.fileContents = fileContents;
    }

    public Parse() : any {
        let parsedYaml = yaml.safeLoadAll(this.fileContents);
        return parsedYaml;
    } 
}