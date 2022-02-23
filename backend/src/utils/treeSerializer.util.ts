import { CommentEntity } from "../modules/comment/comment.entity";

export interface TreeObj {
    node?: CommentEntity;
    children: TreeObj[];
    id: number;
}

export function deserializeTree(nodes: CommentEntity[]) {

    function deserializePath(path: string) {
        const nodes = path.split("/").map(function(item) {
            return parseInt(item, 10);
        });
        nodes.pop();
        return nodes;
    }
    
    function findMatch(level: TreeObj[], id: number) {
        for (const tree of level) {
            if (tree.id === id) {
                return tree;
            }
        }
    }
    
    function leaf(node: CommentEntity): TreeObj {
        return {
            node: node,
            children: [],
            id: node.id
        }
    }
    
    function internal(id: number): TreeObj {
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