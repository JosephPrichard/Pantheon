/*
 * Copyright (c) Joseph Prichard 2022.
 */

import React from "react";
import SearchFeed from "../SearchFeed";
import { ForumEntity } from "../../../../../client/models/forum";
import ForumPanel from "../../../../Forum/ForumPanel/ForumPanel";

interface Props {
    forum: ForumEntity;
    text: string;
    page: number;
}

const SearchForumFeed = ({ forum, text, page }: Props) => (
    <SearchFeed
        text={text}
        page={page}
    >
        <ForumPanel forum={forum}/>
    </SearchFeed>
);

export default SearchForumFeed;