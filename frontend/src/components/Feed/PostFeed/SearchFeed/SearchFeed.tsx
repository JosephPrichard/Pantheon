/*
 * Copyright (c) Joseph Prichard 2022.
 */

import useSWR from "swr";
import { buildFetchSearchFeedUrl, PostsRes } from "../../Feed.client";
import { fetcher } from "../../../../utils/fetcher";
import PostFeed from "../PostFeed";
import Pagination from "../../../Util/Widget/Pagination/Pagination";
import React from "react";
import SearchTopBar from "../../../Search/SearchTopBar/SearchTopBar";

interface Props {
    text: string;
    page: number;
    children: React.ReactNode;
}

const SearchFeed = ({ text, page, children }: Props) => {
    const { data } = useSWR<PostsRes>(buildFetchSearchFeedUrl(text, undefined, page), fetcher);

    return (
        <PostFeed
            posts={data?.posts}
            topBar={
                <SearchTopBar text={text}/>
            }
            pagination={
                <>
                    {!data?.pageCount ||
                        <Pagination
                            page={page}
                            total={data.pageCount}
                            siblings={5}
                            boundaries={2}
                            url={`/search/${text}`}
                        />
                    }
                </>
            }
        >
            { children }
        </PostFeed>
    );
}

export default SearchFeed;