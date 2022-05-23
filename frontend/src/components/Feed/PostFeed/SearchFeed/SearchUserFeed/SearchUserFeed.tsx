/*
 * Copyright (c) Joseph Prichard 2022.
 */

import React from "react";
import { UserEntity } from "../../../../../client/models/user";
import SearchFeed from "../SearchFeed";
import UserPanel from "../../../../User/UserPanel/UserPanel";

interface Props {
    user: UserEntity;
    text: string;
    page: number;
}

const SearchUserFeed = ({ user, text, page }: Props) => (
    <SearchFeed
        text={text}
        page={page}
    >
        <UserPanel user={user}/>
    </SearchFeed>
);

export default SearchUserFeed;