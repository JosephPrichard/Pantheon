import React, { FunctionComponent } from "react";
import { SortType, TimeType } from "../../../model/global";
import styles from "./Posts.module.css";
import useSWR from "swr";
import { SearchRes } from "../../../api/interfaces/post";
import { fetcher } from "../../../utils/client/fetcher";
import PostPanel from "../PostPanel/PostPanel";
import Pagination from "../../Util/Widget/Pagination/Pagination";
import PostSkeleton from "../../Util/Loading/PostSkeleton/PostSkeleton";

interface Props {
    sort: SortType;
    time?: TimeType;
    user?: string;
    width?: string | number;
    page: number;
    buildURL: (sort: SortType, time?: TimeType) => string;
}

function buildFetchUrl({ sort, user, time, page }: Props) {
    let url = "/api/posts/search?";
    if (sort) {
        url += "sort=" + sort;
        if (sort === "top" && time) {
            url += "&time=" + time;
        }
    } else {
        url += "sort=" + "new";
    }
    if (user) {
        user += "&poster=" + user;
    }
    url += "&page=" + page;
    return url;
}

const Posts: FunctionComponent<Props> = (props: Props) => {

    const { data } = useSWR<SearchRes>(buildFetchUrl(props), fetcher);

    return (
        <div 
            className={styles.UserPosts}
            style={{
                width: props.width
            }}
        >
            {data ?
                ((data && data.posts.length !== 0) ?
                    <>
                        <div className={styles.UserPosts}>
                            {data?.posts?.map((post, i) => (
                                <PostPanel key={i} post={post} />
                            ))}
                        </div>
                        <div className={styles.Pagination}>
                            <div className={styles.PaginationInner}>
                                <Pagination 
                                    page={props.page} 
                                    total={data.pageCount}
                                    siblings={5}
                                    boundaries={2}
                                    url={props.buildURL(props.sort, props.time)}
                                />
                            </div>
                        </div>
                    </>
                    :
                    <div className={styles.BigText}>
                        Sorry, we couldn't find any posts.
                    </div>)
                :
                <>
                    <PostSkeleton/>
                    <PostSkeleton/>
                    <PostSkeleton/>
                </>
            }

        </div>
    );
}

Posts.defaultProps = {
    width: "100%"
}

export default Posts;