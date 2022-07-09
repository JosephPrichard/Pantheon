/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { CommentEntity } from "./comment.entity";

export interface TreeObj {
    comment?: CommentEntity;
    children: TreeObj[];
}

// makes a new tree node from a comment
function makeNode(comment: CommentEntity): TreeObj {
    return { comment: comment, children: [] };
}

// makes a new tree node not knowing the comment
function makeEmpty(): TreeObj {
    return { children: [] };
}

export function deserializeTree(comments: CommentEntity[]) {
    const roots: TreeObj[] = [];
    const nodeMap: { [key: number]: TreeObj } = {};

    for (const comment of comments) {
        const parent = comment.parentId;

        // set the comment value for the node
        let node = nodeMap[comment.id];
        // check if node is in nodeMap
        if (node) {
            // node structure is already in map, just set the comment
            node.comment = comment;
        } else {
            // create new node structure with comment and add it to map
            node = makeNode(comment);
            nodeMap[comment.id] = node;
        }

        // set the comment value for the parent
        if (!parent) {
            // check if parent is null, if so, the node is a root
            roots.push(node);
            continue;
        }

        let parentNode = nodeMap[parent];
        // check if parent node is in nodeMap
        if (!parentNode) {
            // create new parent node structure without comment and add it to map
            parentNode = makeEmpty();
            nodeMap[parent] = parentNode;
        }
        // add the node as a child of the parent
        parentNode.children.push(node);
    }

    return roots;
}