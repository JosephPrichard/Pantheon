import useSWR from "swr";
import { ForumEntity } from "../../../../client/models/forum";
import { SortType, TimeType } from "../../../../global";
import { fetcher } from "../../../../utils/fetcher";
import ForumPanel from "../../../Forum/ForumPanel/ForumPanel";
import PostFeed from "../PostFeed";
import { buildFetchForumFeedUrl, PostsRes } from "../../Feed.client";
import SortOptions from "../../../Util/Widget/SortOptions/SortOptions";

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
        if (time) {
            url += "?t=" + time;
        }
        return url;
    }

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
            <ForumPanel forum={forum}/>
        </PostFeed>
    );
}

export default ForumFeed;