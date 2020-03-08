import * as React from "react";

interface IProps {
    name?: string
    data?: any
}

interface IState {

}

export class CustomService extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        console.log("constructor called")
    }

    render () {
        return (
            <div>
                <p>NAME: <text>{this.props.name}</text></p>
                <p>PORT: <text>{this.props.data?.ports?.map((port) => (port + "\n"))}</text></p>
                <p>DOCKER FILE: <text>{this.props.data?.build?.dockerfile}</text></p>
            </div>
        )
    }
}