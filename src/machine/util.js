import React from 'react';

export const logger = (state, event, target) => {
    const { current, id } = state;
    const date = new Date();
    const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;
    
    console.group(`%cFSM Router transition: %c${event} %c@ ${time}`, 'color: grey; font-weight: normal', 'font-weight: bold;', 'color: grey; font-weight: normal');
    console.log(`%cprev state: %c${current}\n`, 'color: grey; font-weight: bold;', 'color: black;');
    console.log(`%cevent: %c${event}\n`, 'color: blue; font-weight: bold;', 'color: black;');
    console.log(`%cnext state: %c#${id}.${target}\n`, 'color: green; font-weight: bold;', 'color: black;');
    console.groupEnd();
}

export const fakeUUID = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16 | 0;
    let v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
});

const paramRegExp = /^:(.+)/;
export const getChildrenOfType = (children, type) => React.Children.toArray(children).filter(c => c.type.name === type);
export const getChildStateNodes = (children) => getChildrenOfType(children, 'State');
export const isCurrentStack = (id, stack) => !!stack.split('.').find(state => state === id);
export const isExactStack = (id, stack) => stack.split('.').pop() === id;
export const isDynamic = segment => paramRegExp.test(segment);
export const isRootSemgent = url => url.slice(1) === '';
export const segmentize = url => url.replace(/(^\/+|\/+$)/g, '').split('/');

// export const injectUrlParameters = (path, params) => {
//     const url = segmentize(path).map(seg => {
//         if (isDynamic(seg)) {
//             const segParam = seg.replace(':', '');

//             if (Object.keys(params).includes(segParam)) {
//                 return params[segParam];
//             } else {
//                 console.error(`Cannot push to a dynamic URL without supplying the proper parameters: ${seg} parameter is missing.`);
//             }
//         }

//         return seg;
//     });

//     return '/' + url.join('/');
// }

export const deriveStateFromUrl = (url, routeMap) => {
    let match = {
        params: {},
        path: url,
        stack: routeMap[url]
    }

    // 1. Exact match, no dynamic URL needed
    if (match.stack) {
        return match;
    }

    // 2. No exact match, check for dynamic URL match
    const dynamicPaths = Object.keys(routeMap).filter(route => route.match(/\/:/g));

    if (dynamicPaths.length) {
        // 2.1 Split url && route map into arrays, compare 1 by 1
        const urlSegments = segmentize(url);
        let params;
        const path = dynamicPaths.find(p => {
            const pathSegments = segmentize(p);
            params = {};

            if (pathSegments.length !== urlSegments.length) {
                return false;
            }

            // 2.2 infer parameter from URL from first segment array that matches in length
            return !pathSegments.map((pathSegment, i) => {
                if (isDynamic(pathSegment)) {
                    params[pathSegment.slice(1)] = urlSegments[i];
                    return true;
                } else if (pathSegment === urlSegments[i]) {
                    return true;
                }

                return false;
            }).includes(false);
        });

        return {
            params,
            path,
            stack: routeMap[path]
        }
    } else {
        return null;
    }
}

function getAllStacks(stateNodes) {
    return stateNodes.reduce((acc, child) => {
        const childStates = getChildStateNodes(child.props.children);
        const grandChildStacks = getAllStacks(childStates);
        const { id } = child.props;

        acc.push('.' + id);
        
        if (grandChildStacks.length) {
            grandChildStacks.forEach(gcs => acc.push('.' + id + gcs));
        }

        return acc;
    }, []);
}

function getAllRoutes(stateNodes) {
    return stateNodes.reduce((acc, child) => {
        const childStates = getChildStateNodes(child.props.children);
        const grandChildRoutes = getAllRoutes(childStates);
        const grandChildRoutesArr = Object.keys(grandChildRoutes);
        const { id, path } = child.props;

        if (path) {
            acc[path] = '.' + id;
        }
        
        if (grandChildRoutesArr.length) {
            grandChildRoutesArr.forEach(route => acc[path ?
                path + route
                : route] = '.' + id + grandChildRoutes[route]
            );
        }

        return acc;
    }, {});
}

export function normalizeChildStates(stateNodes) {
    let initIndex = stateNodes.findIndex(s => s.props.initial);
    initIndex = initIndex >= 0 ? initIndex : 0;

    return stateNodes.reduce((acc, stateNode, i) => {
        const childStates = getChildStateNodes(stateNode.props.children);
        const { id, path = null, type } = stateNode.props;

        acc.push({
            id: id,
            initial: i === initIndex,
            path: path,
            stack: '.' + id,
            type: type === 'parallel' ? 'parallel'
                : childStates.length === 0 ? 'atomic'
                : childStates.length > 1 ? 'compound' : 'default'
        });

        if (childStates.length) {
            const normChildStates = normalizeChildStates(childStates)
            normChildStates.forEach((gcs, j) => acc.push({
                id: gcs.id,
                initial: gcs.initial,
                path: path ? gcs.path ? path + gcs.path : path : gcs.path,
                stack: '.' + id + gcs.stack,
                type: gcs.type
            }));
        }

        return acc;
    }, []);
}

export function generateStackMaps(stateNodes, rootId, basePath) {
    const normalized = normalizeChildStates(stateNodes);
    const routes = normalized.reduce((acc, s) => {
        // const key = s.path ? basePath ? basePath + s.path : s.path : null;
        const key = s.path;

        if (key && !acc.hasOwnProperty(key)) {
            acc[key] = s.path && '#' + rootId + s.stack;
        }
        return acc;
    }, {});
    const stacks = normalized.map(s => '#' + rootId + s.stack);

    return {
        normalized,
        routes,
        stacks
    }
}

export function resolveInitial(stateNodes) {
    const initialChild = stateNodes.find(c => c.props.initial) || stateNodes[0];
    const childStates = getChildStateNodes(initialChild.props.children);
    const { id } = initialChild.props;

    if (childStates.length > 0) {
        console.log(childStates);
        // return id + resolveInitial(childStates);
    } else {
        return id;
    }
}
