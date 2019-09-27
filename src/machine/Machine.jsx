import React, { useEffect, useState } from 'react';
import { createBrowserHistory } from 'history';
import { log } from './util';

export const history = createBrowserHistory({
    basename: '/checkout',
});

export const StateMachineContext = React.createContext();
StateMachineContext.displayName = 'Machine';

export class MachineClass extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            current: `#${props.id}`,
            id: props.id,
            matches: this.matches,
            resolveStack: this.resolveStack,
            transition: this.transition
        }
    }

    matches = (stateId) => this.state.current.split('.').includes(stateId);

    resolveStack = (stateId) => {
        this.setState({ current: `#${this.state.id}.${stateId}` });
    }

    transition = (event, target) => {
        log(this.state, event, target);
        return this.setState({ current: `#${this.state.id}.${target}` });
    };

    render() {
        return <StateMachineContext.Provider value={this.state}>
            {this.props.children}
        </StateMachineContext.Provider>;
    }
}

export function Machine ({ children, id, url }) {
    const [ state, setState ] = useState({
        current: `#${id}`,
        id
    });
    
    const matches = (stateId) => {
        // console.log('matches', stateId, state.current);
        return state.current.split('.').includes(stateId);
    };
    const resolveStack = (stateId) => {
        console.log('resolveStack', stateId);
        setState({ ...state, current: `#${id}.${stateId}` });
    };
    const transition = (event, target) => {
        // log(state, event, target);      // Stale
        console.log('transition', state.current);
        setState({ ...state, current: `#${id}.${target}` });
    };

    // console.log(state.current);
    // useEffect(() => console.log(state.current));

    const providerValue = {
        ...state,
        matches,
        resolveStack,
        transition
    }
    
    return <StateMachineContext.Provider value={providerValue}>
        {children}
    </StateMachineContext.Provider>;
}

