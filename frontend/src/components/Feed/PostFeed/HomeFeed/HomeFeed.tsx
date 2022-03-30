/*
 * Copyright (c) Joseph Prichard 2022.
 */

import React from "react";
import useSWR from "swr";
import { ALLTIME, SortType, TimeType } from "../../../../global";
import { fetcher } from "../../../../utils/fetcher";
import SubList from "../../../Subscription/SubList/SubList";
import FeedPanel from "../../FeedPanel/FeedPanel";
import PostFeed from "../PostFeed";
import { buildFetchHomeFeedUrl, PostsRes } from "../../Feed.client";
import SortOptions from "../../../Util/Widget/SortOptions/SortOptions";
import Pagination from "../../../Util/Widget/Pagination/Pagination";

interface Props {
    sort: SortType;
    time: TimeType;
    page: number;
}

const HomeFeed = ({ sort, time, page }: Props) => {
    const { data } = useSWR<PostsRes>(buildFetchHomeFeedUrl(sort, time, page), fetcher);

    const buildPageURL = (sort: SortType, time?: TimeType) => {
        let url = `/${sort}`;
        if (time && time !== ALLTIME) {
            url += "?t=" + time;
        }
        return url;
    }

    return (
        <PostFeed
            posts={data?.posts}
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
            <FeedPanel
                title="Home"
                description="Your personal Pantheon frontpage. Come here to see posts from your subscribed forums."
            >
                <SubList/>
            </FeedPanel>
        </PostFeed>
    );
}

export default HomeFeed;
