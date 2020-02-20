import { parse } from "@babel/core";

export class DockerComposeParser {
    fileContents: string;
    
    constructor(fileContents: string) {
        this.fileContents = fileContents;
    }

    public Parse() : any {
        let fileContentsArray = this.fileContents.split('\n');
        let lastLevelDeep = 0;
        let level = 0;
        let prevLevel = 0;
        let paddingSize = 0;
        let commandStack : Array<string> = [];
        let dockerComposeModal : any = {};
        for(let line of fileContentsArray) {
            let i = 0;
            for(i = 0; i < line.length && line[i] == " "; i++);
            if(i == line.length) {
                continue;
            }

            let strippedLine = line.substr(i);
            if(strippedLine.startsWith('#')) {
                continue;
            }

            if(paddingSize == 0) {
                if(i > 0) {
                    lastLevelDeep = i;
                    level += 1;
                    paddingSize = i;
                }
            } else {
                if(i > lastLevelDeep) {
                    if(i == lastLevelDeep + paddingSize) {
                        level += 1;
                        lastLevelDeep = i;
                    } else {
                        throw "Wrong formatted docker-compose file";
                    }
                } else if(i < lastLevelDeep) {
                    if(i == lastLevelDeep - paddingSize) {
                        level -= 1;
                        lastLevelDeep = i;
                        commandStack.pop();
                    } else {
                        throw "Wrong formatted docker-compose file";
                    }
                }
            }

            if(strippedLine.startsWith('-')) {
                if(commandStack.length == 0 || prevLevel != level) {
                    throw "Wrong formatted docker-compose file";
                }
                let l : Array<string> = strippedLine.split(' ');
                if (l.length <= 1) {
                    throw "Wrong formatted docker-compose file";
                } else {
                    dockerComposeModal = this.pushToCommandStack(dockerComposeModal, commandStack, l[1]);
                }
            } else { 
                let l: Array<string|undefined> = strippedLine.split(':').map((a) => {
                    if(a != "") return a;
                });
                if(l.length == 0) {
                    throw "Wrong formatted docker-compose file";
                }
                if(level == prevLevel) {
                    commandStack.pop();
                    commandStack.push(<string>l[0]);
                } else if(level < prevLevel) {
                    for(let i = level; i < prevLevel; i++) {
                        commandStack.pop();
                    }
                    commandStack.push(<string>l[0]);
                } else {
                    commandStack.push(<string>l[0]);
                }

                if(l.length > 1) {
                    for(let i = 1; i < l.length; i++) {
                        dockerComposeModal = this.pushToCommandStack(dockerComposeModal, commandStack, <string>l[i])
                    }
                }
            }
            
            prevLevel = level;
        }
        return dockerComposeModal;
    } 

    public pushToCommandStack(dockerComposeModal: any, commandStack: Array<string>, value: any, i: number = 0) : any {
        if(i == commandStack.length - 1) {
            if(dockerComposeModal[commandStack[i]] == undefined) {
                dockerComposeModal[commandStack[i]] = [value];
            } else {
                dockerComposeModal[commandStack[i]].push(value);
            }
            return dockerComposeModal;
        }
        return this.pushToCommandStack(dockerComposeModal[commandStack[i]], commandStack, value, i+1);
    }
}