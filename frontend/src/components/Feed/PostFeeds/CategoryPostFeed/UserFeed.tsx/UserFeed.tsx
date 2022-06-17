/*
 * Copyright (c) Joseph Prichard 2022.
 */

import useSWR from "swr";
import { UserEntity } from "../../../../../client/models/user";
import { fetcher } from "../../../../../utils/fetcher";
import UserPanel from "../../../../User/UserPanel/UserPanel";
import { buildFetchUserFeedUrl, PostsRes } from "../../../../../client/api/feed";
import PostFeed from "../../PostFeed/PostFeed";
import FeedPagination from "../../../FeedPagination/FeedPagination";
import React from "react";
import { getAfterCursor, getBeforeCursor } from "../../../../../utils/cursor";

interface Props {
    user: UserEntity;
    afterCursor?: number;
    beforeCursor?: number;
}

const UserFeed = ({ user, afterCursor, beforeCursor }: Props) => {
    const { data } = useSWR<PostsRes>(buildFetchUserFeedUrl(user.id, beforeCursor, afterCursor), fetcher);

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
                            url={`/user/${user.name}`}
                        />
                    }
                </>
            }
        >
            <UserPanel user={user}/>
        </PostFeed>
    );
}

export default UserFeed;