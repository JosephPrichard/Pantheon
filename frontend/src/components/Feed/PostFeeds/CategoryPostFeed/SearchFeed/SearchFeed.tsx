/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { buildFetchSearchFeedUrl, PostsSearchRes } from "../../../../../client/api/feed";
import PostFeed from "../../PostFeed/PostFeed";
import React from "react";
import SearchPanel from "../../../../Search/SearchPanel/SearchPanel";
import { useFetch } from "../../../../../hooks/useFetch";

interface Props {
    user?: number;
    forum?: string;
    text: string;
}

const SearchFeed = ({ text, user, forum }: Props) => {
    const { data } = useFetch<PostsSearchRes>(buildFetchSearchFeedUrl(text, user, forum));

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