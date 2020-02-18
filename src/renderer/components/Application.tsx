import { hot } from 'react-hot-loader/root';
import * as React from 'react';

import CounterContainer from '../containers/CounterContainer';
import { InstallOrchestrator } from '../Application/Orchestrator/Install/InstallOrchestrator';
import { Platform } from '../Application/Platform';
import { ProgramDefinitions } from '../Application/Program/ProgramDefinitions';

var options = {
  name: 'Electron'
};

var brewInstalled = false;

const Application = () => {
    let installOrchestrator = new InstallOrchestrator(Platform.Mac);
    installOrchestrator.install(ProgramDefinitions.NGINX)
    .then((res) => {
        console.log(res)
    })
    
    return (
        <div>
            Hello World from Electron!
            <CounterContainer />
        </div>
    )
}; 

export default hot(Application);
