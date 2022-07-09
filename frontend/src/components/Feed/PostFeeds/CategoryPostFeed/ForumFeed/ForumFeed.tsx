/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { ForumEntity } from "../../../../../client/models/forum";
import ForumPanel from "../../../../Forum/ForumPanel/ForumPanel";
import PostFeed from "../../PostFeed/PostFeed";
import { buildFetchForumFeedUrl, PostsRes } from "../../../../../client/api/feed";
import FeedPagination from "../../../FeedPagination/FeedPagination";
import React from "react";
import { getAfterCursor, getBeforeCursor } from "../../../../../utils/cursor";
import { useFetch } from "../../../../../hooks/useFetch";

interface Props {
    forum: ForumEntity;
    afterCursor?: number;
    beforeCursor?: number;
}

const ForumFeed = ({ forum, afterCursor, beforeCursor }: Props) => {
    const { data } = useFetch<PostsRes>(buildFetchForumFeedUrl(forum.id, beforeCursor, afterCursor));

    return (
        <PostFeed
            posts={data?.posts}
            postVotes={data?.postVotes}
            pagination={
                <>
                    {!data?.posts ||
                        <FeedPagination
                            afterCursor={getAfterCursor(data?.posts)}
                            beforeCursor={getBeforeCursor(data?.posts)}
                            showNext={data?.nextPage || beforeCursor != undefined}
                            showPrev={(data?.nextPage || afterCursor != undefined) && !(!beforeCursor && !afterCursor)}
                            url={`/forum/${forum.id}`}
                        />
                    }
                </>
            }
        >
            <ForumPanel forum={forum}/>
        </PostFeed>
    );
}

export default ForumFeed;