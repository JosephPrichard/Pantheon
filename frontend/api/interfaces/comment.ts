export interface UpdateBody {
    update: {
        content: string;
    };
}

export interface GetTreeBody {
    path: string[];
}

export interface CreateNodeBody {
    parentComment: string;
    content: string;
}

export interface GetRootsBody {
    post: string;
    skip: number;
    limit: number;
}

export interface CreateRootBody {
    post: string;
    content: string;
}
