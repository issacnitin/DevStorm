import * as React from "react";

interface IProps {
    ports?: number
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
                PORT: <text>{this.props.ports}</text>
            </div>
        )
    }
}