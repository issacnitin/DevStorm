import * as React from 'react';
import { DevConsole } from '../Application/DevConsole';
import { Platform } from '../Application/Platform';
import { ProgramDefinitions, GetProgramDefinition } from '../Application/Program/ProgramDefinitions';
import { FragmentProvider } from './Fragments/FragmentProvider';

interface IProps {

}

interface IState {
    log: string;
    fragments: Array<JSX.Element>
}

export class Application extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            log: "",
            fragments: []
        }
    }

    async execute(event: any) {
        this.setState({
            log: ""
        })
        let c = new DevConsole(Platform.Mac);
        let dockerComposeFile = await c.DockerComposeOrchestrator.GenerateDockerComposeService([ProgramDefinitions.NGINX], this.stdout, this.stderr);
        this.setState({
            log: dockerComposeFile
        })
    }

    stdout = (data: string) => {
        let log = this.state.log;
        this.setState({
            log: log + data
        })
    }

    stderr = (data: string) => {
        let log = this.state.log;
        this.setState({
            log: log + data
        })
    }

    loadFragments = async (e: any) => {
        let data : Array<JSX.Element> = []
        let c = new DevConsole(Platform.Mac);
        let parsedDockerFile = await c.DockerComposeOrchestrator.ReadDockerCompose("docker-compose.yml");
        console.log(parsedDockerFile)
        for(let service in parsedDockerFile) {
            let program: ProgramDefinitions = GetProgramDefinition(service.toLowerCase());
            let data = parsedDockerFile["service"];
            data.push(<FragmentProvider program={program} data={data}/>)
        }
        this.setState({
            fragments: data
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.log.split('\n').map((line, i) => (
                        <text key={i}>{line}<br /></text>
                    ))
                }
                <button onClick={e => this.execute(e)} >Execute</button>
                <button onClick={e => this.loadFragments(e)} >Show Fragments</button>
                {this.state.fragments}
            </div>
        )
    }
}
