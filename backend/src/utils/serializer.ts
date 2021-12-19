const BRANCH = "/";

const NodeSerializer = {
    appendNode(path: string, node: string) {
        path += node + BRANCH;
        return path;
    },

    serializePath(nodes: string[]) {
        let path = BRANCH;
        for (const node of nodes) {
            path = NodeSerializer.appendNode(path, node);
        }
        return path;
    },

    getRoot(path: string) {
        path = path.substring(1);
        return path.substring(0, path.indexOf(BRANCH));
    },

    toNode(id: string) {
        return BRANCH + id + BRANCH;
    }
};

export { NodeSerializer };
