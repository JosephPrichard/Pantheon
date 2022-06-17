/*
 * Copyright (c) Joseph Prichard 2022.
 */

import useSWR from "swr";
import { ForumEntity } from "../../../../../client/models/forum";
import { fetcher } from "../../../../../utils/fetcher";
import ForumPanel from "../../../../Forum/ForumPanel/ForumPanel";
import PostFeed from "../../PostFeed/PostFeed";
import { buildFetchForumFeedUrl, PostsRes } from "../../../../../client/api/feed";
import FeedPagination from "../../../FeedPagination/FeedPagination";
import React from "react";
import { getAfterCursor, getBeforeCursor } from "../../../../../utils/cursor";

interface Props {
    forum: ForumEntity;
    afterCursor?: number;
    beforeCursor?: number;
}

const ForumFeed = ({ forum, afterCursor, beforeCursor }: Props) => {
    const { data } = useSWR<PostsRes>(buildFetchForumFeedUrl(forum.id, beforeCursor, afterCursor), fetcher);

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