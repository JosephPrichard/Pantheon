import { StaticPool } from "node-worker-threads-pool";

export interface NodeObj {
    id: string;
    path: string;
}

export interface TreeObj {
    node?: NodeObj;
    children: TreeObj[];
    id: string;
}

export function deserializeTree(nodes: NodeObj[]) {

    function deserializePath(path: string) {
        const nodes = path.split("/");
        nodes.pop();
        return nodes;
    }
    
    function findMatch(level: TreeObj[], id: string) {
        for (const tree of level) {
            if (tree.id === id) {
                return tree;
            }
        }
    }
    
    function leaf(node: NodeObj): TreeObj {
        return {
            node: node,
            children: [],
            id: node.id
        }
    }
    
    function internal(id: string): TreeObj {
        return {
            children: [],
            id
        }
    }

    const roots: TreeObj[] = [];

    for (const node of nodes) {

        const path = deserializePath(node.path);

        // base case: path is a root
        if (path.length === 0) {
            const match = findMatch(roots, node.id);
            if (match) {
                match.node = node;
            } else {
                roots.push(leaf(node));
            }
            continue;
        }

        let level = roots;

        for (let i = 0; i < path.length; i++) {

            const match = findMatch(level, path[i]);
            if (match) {
                level = match.children;
            } else {
                const tree = internal(path[i]);
                level.push(tree);
                level = tree.children;
            }

        }

        const match = findMatch(level, node.id);
        if (match) {
            match.node = node;
        } else {
            level.push(leaf(node));
        }
    }

    return { roots };
}