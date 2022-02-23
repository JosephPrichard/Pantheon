import useSWR from "swr";
import { ForumEntity } from "../../../../client/models/forum";
import { ALLTIME, SortType, TimeType } from "../../../../global";
import { fetcher } from "../../../../utils/fetcher";
import ForumPanel from "../../../Forum/ForumPanel/ForumPanel";
import PostFeed from "../PostFeed";
import { buildFetchForumFeedUrl, PostsRes } from "../../Feed.client";
import SortOptions from "../../../Util/Widget/SortOptions/SortOptions";
import Pagination from "../../../Util/Widget/Pagination/Pagination";
import React from "react";

interface Props {
    forum: ForumEntity;
    sort: SortType;
    time: TimeType;
    page: number;
}

const ForumFeed = ({ forum, sort, time, page }: Props) => {
    const { data } = useSWR<PostsRes>(buildFetchForumFeedUrl(forum.id, sort, time, page), fetcher);

    const buildPageURL = (sort: SortType, time?: TimeType) => {
        let url = `/forum/${forum.id}/${sort}`;
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
            <ForumPanel forum={forum}/>
        </PostFeed>
    );
}

export default ForumFeed;