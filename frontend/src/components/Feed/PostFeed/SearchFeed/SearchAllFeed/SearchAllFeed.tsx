/*
 * Copyright (c) Joseph Prichard 2022.
 */

import SearchFeed from "../SearchFeed";
import React from "react";
import SearchPanel from "../../../../Search/SearchPanel/SearchPanel";

interface Props {
    text: string;
    page: number;
}

const SearchAllFeed = ({ text, page }: Props) => (
    <SearchFeed
        text={text}
        page={page}
    >
        <SearchPanel/>
    </SearchFeed>
);

export default SearchAllFeed;