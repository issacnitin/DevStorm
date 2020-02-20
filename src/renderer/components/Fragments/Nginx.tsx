import * as React from "react";

interface IProps {
    port?: number
}

interface IState {

}

export class Nginx extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
    }

    render () {
        return (
            <div>
                PORT: <text>{this.props.port}</text>
            </div>
        )
    }
}