/*
 * Copyright (c) Joseph Prichard 2022.
 */

import React from "react";
import { fetcher } from "../../../../../utils/fetcher";
import PostFeed from "../../PostFeed/PostFeed";
import { buildFetchGlobalFeedUrl, PostsRes } from "../../../../../client/api/feed";
import FeedPagination from "../../../FeedPagination/FeedPagination";
import { getAfterCursor, getBeforeCursor } from "../../../../../utils/cursor";
import ForumPreviewList from "../../../../Forum/ForumPreviewList/ForumPreviewList";
import FeedPanel from "../../../FeedPanel/FeedPanel";
import { Space } from "@mantine/core";
import { useFetch } from "../../../../../hooks/useFetch";

interface Props {
    afterCursor?: number;
    beforeCursor?: number;
}

const GlobalFeed = ({ afterCursor, beforeCursor }: Props) => {
    const { data } = useFetch<PostsRes>(buildFetchGlobalFeedUrl(beforeCursor, afterCursor));

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
                            url={"/global"}
                        />
                    }
                </>
            }
        >
            <FeedPanel
                title="Global"
                description={
                    <div>
                        <div>
                            The global page shows posts from all forums.
                        </div>
                        <Space h={10} w={1}/>
                        <div>
                            Logged-in users can choose which forums they subscribe to and filter the posts they want to see.
                        </div>
                    </div>
                }
            >
                <ForumPreviewList/>
            </FeedPanel>
        </PostFeed>
    );
}

export default GlobalFeed;