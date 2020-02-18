import { hot } from 'react-hot-loader/root';
import * as React from 'react';

import CounterContainer from '../containers/CounterContainer';
import * as sudo from 'sudo-prompt';
import * as process from 'child_process';

var options = {
  name: 'Electron'
};

var brewInstalled = false;

const Application = () => {
    
    process.exec('./scripts/unix/nginx/install.sh',
        function(error: any, stdout: any, stderr: any) {
            if (error) {
                process.exec("./scripts/unix/brew/install.sh", (error: any, stdout: any, stderr: any) => {
                    
                        if(error) throw error;
                        console.log(stdout);
                    }
                )
            } else {

                process.exec('./scripts/unix/nginx/install.sh', 
                (error: any, stdout: any, stderr: any) => {
                    if(error) throw error;
                    console.log(stdout);
                }
                );
                console.log('stdout: ' + stdout);
            }
        }
    );
    return (
        <div>
            Hello World from Electron!
            <CounterContainer />
        </div>
    )
}; 

export default hot(Application);
