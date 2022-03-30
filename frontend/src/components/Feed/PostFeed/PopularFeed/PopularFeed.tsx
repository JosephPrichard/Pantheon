/*
 * Copyright (c) Joseph Prichard 2022.
 */

import React from "react";
import useSWR from "swr";
import { ALLTIME, SortType, TimeType } from "../../../../global";
import { fetcher } from "../../../../utils/fetcher";
import ForumList from "../../../Forum/ForumList/ForumList";
import FeedPanel from "../../FeedPanel/FeedPanel";
import PostFeed from "../PostFeed";
import { buildFetchPopularFeedUrl, PostsRes } from "../../Feed.client";
import SortOptions from "../../../Util/Widget/SortOptions/SortOptions";
import Pagination from "../../../Util/Widget/Pagination/Pagination";

interface Props {
    sort: SortType;
    time: TimeType;
    page: number;
    routeToPopular?: boolean;
}

const PopularFeed = ({ sort, time, page, routeToPopular }: Props) => {
    const { data } = useSWR<PostsRes>(buildFetchPopularFeedUrl(sort, time, page), fetcher);

    const buildPageURL = (sort: SortType, time?: TimeType) => {
        let url = `/${routeToPopular ? "popular/" : ""}${sort}`;
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
                title="Popular"
                description="Pantheon's frontpage. Come here to see the best posts on the website."
            >
                <ForumList/>
            </FeedPanel>
        </PostFeed>
    );
}

export default PopularFeed;