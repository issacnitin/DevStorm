import * as React from "react";
import { ProgramDefinitions } from "../../Application/Program/ProgramDefinitions";
import { Nginx } from "./Nginx";

interface IProps {
    program: ProgramDefinitions;
    data?: any
}

interface IState {
    jsx: JSX.Element
}

export class FragmentProvider extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            jsx: <div />
        }
        this.SetFragment();
    }

    public SetFragment() : void {
        switch(this.props.program) {
            case ProgramDefinitions.NGINX:
                this.state = {
                    jsx: <Nginx ports={this.props.data.ports} />
                };
                break; 
            default:
                this.state = {
                    jsx: <div />
                };
                break;
        }
    }

    render() {
        return (
            <div>
                {this.state.jsx}
            </div>
        )
    }
}