import React from "react";
import useSWR from "swr";
import { SortType, TimeType } from "../../../../global";
import { fetcher } from "../../../../utils/fetcher";
import ForumList from "../../../Forum/ForumList/ForumList";
import FeedPanel from "../../FeedPanel/FeedPanel";
import PostFeed from "../PostFeed";
import { buildFetchPopularFeedUrl, buildPageURL, PostsRes } from "../../Feed.client";
import SortOptions from "../../../Util/Widget/SortOptions/SortOptions";

interface Props {
    sort: SortType;
    time: TimeType;
    page: number;
}

const PopularFeed = ({ sort, time, page }: Props) => {
    const { data } = useSWR<PostsRes>(buildFetchPopularFeedUrl(sort, time, page), fetcher);

    return (
        <PostFeed
            posts={data?.posts}
            pageCount={data?.pageCount}
            sort={sort}
            time={time}
            page={page}
            topBar={
                <SortOptions 
                    sort={sort} 
                    time={time} 
                    buildPageURL={buildPageURL}
                />
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