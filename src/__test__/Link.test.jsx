import React from 'react';
import { createMemoryHistory } from 'history';
import { Link, Machine, State } from '..';
import { cleanup, render, fireEvent } from '@testing-library/react';

describe('<Link/>', () => {
    afterEach(cleanup);

    const generic = (name) => ({ children }) => <div><h1>{name}</h1>{children}</div>;
    const genericWithLinks = (name) => (props) => <div>
        <h1>{name}</h1>
        <Link href='/child-1'>URL Push 1</Link>
        <Link href='/child-2'>URL Push 2</Link>
        <Link href='/child-2' replace>URL Replace</Link>
    </div>;
    const renderWithNavigation = (path, element) => {
        const testHistory = createMemoryHistory({ initialEntries: [ path ] });
        const machine = <Machine history={testHistory} id='home' path={path}>
            <State id='parent'>
                <State id='child-1' component={element} path='/child-1'>
                </State>
                <State id='child-2' component={generic('Child 2')} path='/child-2'>
                    <State id='grand-child-2' component={genericWithLinks('Grand Child 2')}/>
                </State>
            </State>
        </Machine>;

        return [ testHistory, machine ];
    }

    test('Build verification', () => {
        const [ history, machine ] = renderWithNavigation(null, genericWithLinks('Child 1'));
        const { queryByText } = render(machine);

        expect(history.location.pathname).toBe('/child-1');
        expect(queryByText('URL Push 1')).toBeTruthy();
        expect(queryByText('URL Push 2')).toBeTruthy();
        expect(queryByText('URL Replace')).toBeTruthy();
    });

    test('Pushes URL to history by default', () => {
        const [ history, machine ] = renderWithNavigation(null, genericWithLinks('Child 1'));
        const { queryByText } = render(machine);

        expect(history.location.pathname).toBe('/child-1');
        expect(queryByText('Child 1')).toBeTruthy();

        fireEvent.click(queryByText('URL Push 2'));
        expect(history.location.pathname).toBe('/child-2');
        expect(history.action).toBe('PUSH');
        expect(queryByText('Grand Child 2')).toBeTruthy();
    });

    test('Resolves to an atomic state when URL has changed, even if the current state hasn\'t', () => {
        const [ history, machine ] = renderWithNavigation(null, genericWithLinks('Child 1'));
        const { queryByText } = render(machine);

        expect(history.location.pathname).toBe('/child-1');
        expect(queryByText('Child 1')).toBeTruthy();

        fireEvent.click(queryByText('URL Push 2'));
        expect(history.location.pathname).toBe('/child-2');
        expect(history.action).toBe('PUSH');
        expect(queryByText('Grand Child 2')).toBeTruthy();

        fireEvent.click(queryByText('URL Push 2'));
        fireEvent.click(queryByText('URL Push 1'));
        expect(history.location.pathname).toBe('/child-1');
        expect(history.action).toBe('PUSH');
        expect(queryByText('Child 1')).toBeTruthy();
    });

    test('Replaces URL in history if "replace" attribute is true and is clicked', () => {
        const [ history, machine ] = renderWithNavigation(null, genericWithLinks('Child 1'));
        const { queryByText } = render(machine);

        expect(history.location.pathname).toBe('/child-1');
        expect(queryByText('Child 1')).toBeTruthy();
        fireEvent.click(queryByText('URL Replace'));
        expect(history.location.pathname).toBe('/child-2');
        expect(history.action).toBe('REPLACE');
        expect(queryByText('Grand Child 2')).toBeTruthy();
    });

    // test.skip('Replaces URL when link for current path is clicked without state', () => {
        
    // });

    // test.skip('Replaces URL when link for current path is clicked with the same state', () => {

    // });

    // test.skip('Pushes URL when link for current path is clicked with different state', () => {

    // });

    test('Ignores clicks when disabled', () => {
        const mockFn = jest.fn();
        const [ history, machine ] = renderWithNavigation(null, (props) => <div>
            <h1>Child 1</h1>
            <Link href='/child-2' disabled onClick={mockFn}>URL Disabled</Link>
        </div>);
        const { queryByText } = render(machine);
        expect(history.location.pathname).toBe('/child-1');
        fireEvent.click(queryByText('URL Disabled'));
        expect(history.location.pathname).toBe('/child-1');
        expect(mockFn).not.toHaveBeenCalled();
    });
});
