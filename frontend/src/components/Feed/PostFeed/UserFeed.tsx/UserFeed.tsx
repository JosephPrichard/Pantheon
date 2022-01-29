import useSWR from "swr";
import { UserEntity } from "../../../../client/models/user";
import { SortType, TimeType } from "../../../../global";
import { fetcher } from "../../../../utils/fetcher";
import UserPanel from "../../../User/UserPanel";
import SortOptions from "../../../Util/Widget/SortOptions/SortOptions";
import { buildFetchUserFeedUrl, PostsRes } from "../../Feed.client";
import PostFeed from "../PostFeed";

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
            <UserPanel user={user}/>
        </PostFeed>
    );
}

export default UserFeed;