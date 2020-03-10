import * as React from "react";
import { ProgramDefinitions } from "../../main/Application/Program/ProgramDefinitions";
import { Nginx } from "./Fragments/Nginx";
import { CustomService } from "./Fragments/CustomService";

interface IProps {
    program: ProgramDefinitions;
    customname?: string;
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
        console.log(this.props.data)
        switch(this.props.program) {
            case ProgramDefinitions.NGINX:
                this.state = {
                    jsx: <Nginx ports={this.props.data.ports} />
                };
                break; 
            case ProgramDefinitions.CUSTOM:
                this.state = {
                    jsx: <CustomService name={this.props.customname} data={this.props.data}/>
                }
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