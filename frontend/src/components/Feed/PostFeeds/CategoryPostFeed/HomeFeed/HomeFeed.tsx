/*
 * Copyright (c) Joseph Prichard 2022.
 */

import React from "react";
import { buildFetchHomeFeedUrl, PostsRes } from "../../../../../client/api/feed";
import FeedPagination from "../../../FeedPagination/FeedPagination";
import { getAfterCursor, getBeforeCursor } from "../../../../../utils/cursor";
import PostFeed from "../../PostFeed/PostFeed";
import SubList from "../../../../Subscription/SubList/SubList";
import FeedPanel from "../../../FeedPanel/FeedPanel";
import { Space } from "@mantine/core";
import useSWR from "swr";

interface Props {
    afterCursor?: number;
    beforeCursor?: number;
}

const HomeFeed = ({ afterCursor, beforeCursor }: Props) => {
    const { data } = useSWR<PostsRes>(buildFetchHomeFeedUrl(beforeCursor, afterCursor));

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
                            url={"/home"}
                        />
                    }
                </>
            }
        >
            <FeedPanel
                title="Home"
                description={
                    <div>
                        <div>
                            The home page is your personal front page.
                        </div>
                        <Space h={10} w={1}/>
                        <div>
                            It selects posts to show you from the ones you've subscribed to only.
                        </div>
                    </div>
                }
            >
                <SubList/>
            </FeedPanel>
        </PostFeed>
    );
}

export default HomeFeed;
