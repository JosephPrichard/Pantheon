/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { CommentEntity } from "./comment.entity";

export const BRANCH = "/";

export interface TreeObj {
    node?: CommentEntity;
    children: TreeObj[];
    id: number;
}

// appends node segment into path
export function appendNode(path: string, node: number) {
    path += node + BRANCH;
    return path;
}

// serializes path into a string to be stored in database
export function serializePath(nodes: number[]) {
    let path = BRANCH;
    for (const node of nodes) {
        path = appendNode(path, node);
    }
    return path;
}

// deserializes a tree path into an array that can be traversed
function deserializePath(path: string) {
    const nodes = path.split("/").map((item) => parseInt(item, 10));
    nodes.pop();
    return nodes;
}

// searches all trees in the current level to see if they have a matching id
function findMatch(level: TreeObj[], id: number) {
    for (const tree of level) {
        if (tree.id === id) {
            return tree;
        }
    }
}

// makes a leaf tree with node value set
function leaf(node: CommentEntity): TreeObj {
    return {
        node: node,
        children: [],
        id: node.id
    };
}

// makes an internal tree that doesn't have node value set yet
function internal(id: number): TreeObj {
    return {
        children: [],
        id: id
    };
}

export function deserializeTree(nodes: CommentEntity[]) {

    const roots: TreeObj[] = [];

    return new Promise<{ roots: TreeObj[] }>((resolve) => {

        // each processChunk function handles adding a single node to the tree
        const processChunk = (i: number) => {
            if (i >= nodes.length) {
                // return from the promise, result array has been computed
                resolve({ roots });
                return;
            }

            const node = nodes[i];

            const path = deserializePath(node.path);

            // base case: path is a root
            if (path.length === 0) {
                const match = findMatch(roots, node.id);
                if (match) {
                    match.node = node;
                } else {
                    roots.push(leaf(node));
                }
                // schedule the next node to be added to the tree
                setImmediate(() => processChunk(i + 1));
                return;
            }

            // for each path segment search the level for matches
            let level = roots;
            for (let i = 0; i < path.length; i++) {
                // check if level already has path tree
                const match = findMatch(level, path[i]);
                if (match) {
                    // if so, traverse that path tree
                    level = match.children;
                } else {
                    // if not, make an internal tree
                    const tree = internal(path[i]);
                    level.push(tree);
                    level = tree.children;
                }
            }

            // check if level has the tree to add
            const match = findMatch(level, node.id);
            if (match) {
                // if so, assign the node value to the tree (tree was internal)
                match.node = node;
            } else {
                // if not, make a new leaf tree with node value
                level.push(leaf(node));
            }

            // schedule the next node to be added to the tree
            setImmediate(() => processChunk(i + 1));
        }

        processChunk(0);
    });
}