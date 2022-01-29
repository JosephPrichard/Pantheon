import React from "react";
import useSWR from "swr";
import { SortType, TimeType } from "../../../../global";
import { fetcher } from "../../../../utils/fetcher";
import SubList from "../../../Forum/SubList/SubList";
import FeedPanel from "../../FeedPanel/FeedPanel";
import PostFeed from "../PostFeed";
import { buildFetchHomeFeedUrl, buildPageURL, PostsRes } from "../../Feed.client";
import SortOptions from "../../../Util/Widget/SortOptions/SortOptions";

interface Props {
    sort: SortType;
    time: TimeType;
    page: number;
}

const HomeFeed = ({ sort, time, page }: Props) => {
    const { data } = useSWR<PostsRes>(buildFetchHomeFeedUrl(sort, time, page), fetcher);

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
                title="Home"
                description="Your personal Pantheon frontpage. Come here to see posts from your subscribed forums."
            >
                <SubList/>
            </FeedPanel>
        </PostFeed>
    );
}

export default HomeFeed;
