import * as React from 'react';
import { DevConsole } from '../Application/DevConsole';
import { Platform } from '../Application/Platform';
import { ProgramDefinitions, GetProgramDefinition } from '../Application/Program/ProgramDefinitions';
import { FragmentProvider } from './FragmentProvider';
import { Button } from "react-bootstrap";
import { ipcRenderer } from 'electron';

interface IProps {

}

interface IState {
    log: string;
    services: Array<any>
}

export class Application extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            log: "",
            services: []
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
        let c = new DevConsole(Platform.Mac);
        let parsedDockerFile = await c.DockerComposeOrchestrator.ReadDockerCompose("docker-compose.yml");
        this.setState({
            services: parsedDockerFile[0].services
        })
    }

    onOpenFileDialogClick = (e: any) => {
        let retval = ipcRenderer.send('synchronous-message', "asd")
        console.log(retval)
    }

    render() {
        return (
            <div>
                {
                    this.state.log.split('\n').map((line, i) => (
                        <text key={i}>{line}<br /></text>
                    ))
                }
                <Button onClick={(e: any) => this.onOpenFileDialogClick(e)} > Open File</Button>
                <Button onClick={(e: any) => this.execute(e)} >Execute</Button>
                <Button onClick={(e: any) => this.loadFragments(e)} >Show Fragments</Button>
                {
                    Object.entries(this.state.services).map(([key, value], index) => {
                        return <FragmentProvider key={index} program={GetProgramDefinition(key)} customname={key} data={value}/>
                    })
                }
            </div>
        )
    }
}
