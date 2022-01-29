const BRANCH = "/";

export function appendNode(path: string, node: number) {
    path += node + BRANCH;
    return path;
}

export function serializePath(nodes: number[]) {
    let path = BRANCH;
    for (const node of nodes) {
        path = appendNode(path, node);
    }
    return path;
}

export function deserializePath(path: string) {
    const nodes = path.split(BRANCH);
    nodes.pop();
    return nodes;
}

export function getRoot(path: string) {
    path = path.substring(1);
    return path.substring(0, path.indexOf(BRANCH));
}