/*
 * Copyright (c) Joseph Prichard 2022.
 */

import useSWR from "swr";
import { UserEntity } from "../../../../client/models/user";
import { ALLTIME, SortType, TimeType } from "../../../../global";
import { fetcher } from "../../../../utils/fetcher";
import UserPanel from "../../../User/UserPanel/UserPanel";
import SortOptions from "../../../Util/Widget/SortOptions/SortOptions";
import { buildFetchUserFeedUrl, PostsRes } from "../../Feed.client";
import PostFeed from "../PostFeed";
import Pagination from "../../../Util/Widget/Pagination/Pagination";
import React from "react";

interface Props {
    user: UserEntity;
    sort: SortType;
    time: TimeType;
    page: number;
}

const UserFeed = ({ user, sort, time, page }: Props) => {
    const { data } = useSWR<PostsRes>(buildFetchUserFeedUrl(user.id, sort, time, page), fetcher);

    const buildPageURL = (sort: SortType, time?: TimeType) => {
        let url = `/user/${user.name}/${sort}`;
        if (time && time !== ALLTIME) {
            url += "?t=" + time;
        }
        return url;
    }

    return (
        <PostFeed
            posts={data?.posts}
            postVotes={data?.postVotes}
            topBar={
                <SortOptions 
                    sort={sort} 
                    time={time} 
                    buildPageURL={buildPageURL}
                />
            }
            pagination={
                <>
                    {!data?.pageCount ||
                        <Pagination
                            page={page}
                            total={data.pageCount}
                            siblings={5}
                            boundaries={2}
                            url={buildPageURL(sort, time)}
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