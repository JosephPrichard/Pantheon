/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { GetServerSideProps, NextPage } from "next";
import { Next } from "../../../src/utils/next";
import Banner from "../../../src/components/Banner/Banner";
import ErrorPage from "../../../src/components/ErrorPage/ErrorPage";
import React from "react";
import { UserEntity } from "../../../src/client/models/user";
import SearchFeed from "../../../src/components/Feed/PostFeeds/CategoryPostFeed/SearchFeed/SearchFeed";
import { fetchUserByName } from "../../../src/client/api/user";
import { NextSeo } from "next-seo";

interface Props {
    user: UserEntity;
    text: string;
}

const SearchPage: NextPage<Next<Props>> = ({ componentProps }: Next<Props>) => {
    return (
        <>
            <NextSeo title={`Search Results on ${componentProps?.user.name}: ${componentProps?.text}`}/>
            {componentProps ?
                <>
                    <Banner
                        title={componentProps.user.name}
                        href={`/user/${componentProps.user.name}`}
                    />
                    <SearchFeed
                        text={componentProps.text}
                        user={componentProps.user.id}
                    />
                </>
                :
                <ErrorPage/>
            }
        </>
    );
};

export const getServerSideProps: GetServerSideProps<Next<Props>> = async ({ query }) => {
    const name = query.name as string | undefined;

    if (!name) {
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
                    text
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