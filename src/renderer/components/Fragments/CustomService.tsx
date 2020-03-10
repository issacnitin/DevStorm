import * as React from "react";
import { Button } from "react-bootstrap";
import { Unix } from "../../../main/Application/Shell/Unix";
import { SudoOptions } from "../../../main/Application/Shell/ShellBase";

interface IProps {
    name?: string
    data?: any
}

interface IState {

}

export class CustomService extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
    }

    onRestartClick = async() => {
        let shell = new Unix({name: "Please grant sudo permission", env: { pwd: ''}} as SudoOptions);
        let result = await shell.executeShellElevated('docker-compose restart ' + this.props.name)
        console.log(result)
    }

    render () {
        return (
            <div>
                <p>NAME: <text>{this.props.name}</text></p>
                <p>PORT: <text>{this.props.data?.ports?.map((port: string) => (port + "\n"))}</text></p>
                <p>DOCKER FILE: <text>{this.props.data?.build?.dockerfile}</text></p>
                <Button onClick={this.onRestartClick}>Restart</Button>
            </div>
        )
    }
}