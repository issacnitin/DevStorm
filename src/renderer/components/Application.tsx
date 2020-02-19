import * as React from 'react';
import { DevConsole } from '../Application/DevConsole';
import { Platform } from '../Application/Platform';
import { ProgramDefinitions } from '../Application/Program/ProgramDefinitions';

interface IProps {

}

interface IState {
    log: string;
}

export class Application extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            log: ""
        }
    }

    async execute(event: any) {
        this.setState({
            log: ""
        })
        let c = new DevConsole(Platform.Mac);
        let dockerComposeFile = await c.DockerComposeOrchestrator.GenerateDockerComposeService([ProgramDefinitions.NGINX], this.stdout, this.stderr);
        console.log(dockerComposeFile)
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

    render() {
        return (
            <div>
                {
                    this.state.log.split('\n').map((line, i) => (
                        <text key={i}>{line}<br /></text>
                    ))
                }
                <button onClick={e => this.execute(e)} >Execute</button>
            </div>
        )
    }
}
