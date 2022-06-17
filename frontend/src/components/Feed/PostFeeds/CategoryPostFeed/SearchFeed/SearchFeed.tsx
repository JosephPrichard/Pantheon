/*
 * Copyright (c) Joseph Prichard 2022.
 */

import useSWR from "swr";
import { buildFetchSearchFeedUrl, PostsSearchRes } from "../../../../../client/api/feed";
import { fetcher } from "../../../../../utils/fetcher";
import PostFeed from "../../PostFeed/PostFeed";
import React from "react";
import SearchPanel from "../../../../Search/SearchPanel/SearchPanel";

interface Props {
    user?: number;
    forum?: string;
    text: string;
}

const SearchFeed = ({ text, user, forum }: Props) => {
    const { data } = useSWR<PostsSearchRes>(buildFetchSearchFeedUrl(text, user, forum), fetcher);

    const resultCount = data?.posts?.length;

    return (
        <PostFeed
            posts={data?.posts}
            postVotes={data?.postVotes}
        >
            <SearchPanel
                text={text}
                resultCount={resultCount ? resultCount : 0}
            />
        </PostFeed>
    );
}

export default SearchFeed;