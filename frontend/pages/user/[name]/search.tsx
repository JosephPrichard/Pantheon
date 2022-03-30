/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { GetServerSideProps, NextPage } from "next";
import { PageProps } from "../../../src/utils/next/PageProps";
import Banner from "../../../src/components/Banner/Banner";
import ErrorPage from "../../../src/components/ErrorPage/ErrorPage";
import axios from "axios";
import { configNoCreds } from "../../../src/client/config";
import React from "react";
import { UserEntity } from "../../../src/client/models/user";
import SearchUserFeed from "../../../src/components/Feed/PostFeed/SearchFeed/SearchUser/SearchUserFeed";

interface Props {
    user: UserEntity;
    text: string;
    page: number;
}

const SearchPage: NextPage<PageProps<Props>> = ({ componentProps }: PageProps<Props>) => {
    return (
        <>
            {componentProps ?
                <>
                    <Banner
                        title={componentProps.user.name}
                        href={`/user/${componentProps.user.name}`}
                    />
                    <SearchUserFeed
                        user={componentProps.user}
                        text={componentProps.text}
                        page={componentProps.page}
                    />
                </>
                :
                <ErrorPage/>
            }
        </>
    );
};

interface UserRes {
    user: UserEntity;
}

async function fetchUserByName(name: string) {
    return await axios.get<UserRes>(`/api/users?name=${name}`, configNoCreds);
}

export const getServerSideProps: GetServerSideProps<PageProps<Props>> = async ({ query }) => {
    const name = query.name as string | undefined;

    if (!name) {
        return {
            props: {}
        };
    }

    const pageStr = query.p as string | undefined;
    let page = Number(pageStr);
    if (!page) {
        page = 1;
    }
    if (isNaN(page) || page <= 0) {
        return {
            props: {}
        };
    }

    const text = query.text as string | undefined;
    if (!text) {
        return {
            props: {}
        };
    }

    try {
        const res = await fetchUserByName(name);
        const user = res.data.user;
        return {
            props: {
                componentProps: {
                    user,
                    text,
                    page
                }
            }
        };
    } catch(err) {
        return {
            props: {}
        };
    }

}

export default SearchPage;