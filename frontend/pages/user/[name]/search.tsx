/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { GetServerSideProps, NextPage } from "next";
import { NextProps } from "../../../src/utils/next";
import TopBanner from "../../../src/components/Banner/TopBanner/TopBanner";
import Error from "../../../src/components/Error/Error";
import React from "react";
import { UserEntity } from "../../../src/client/models/user";
import SearchFeed from "../../../src/components/Feed/PostFeeds/CategoryPostFeed/SearchFeed/SearchFeed";
import { fetchUserByName } from "../../../src/client/api/user";
import { NextSeo } from "next-seo";

interface Props {
    user: UserEntity;
    text: string;
}

const SearchPage: NextPage<NextProps<Props>> = ({ componentProps }: NextProps<Props>) => {
    return (
        <>
            <NextSeo title={`Search Results: ${componentProps?.text}`}/>
            {componentProps ?
                <>
                    <TopBanner
                        title={componentProps.user.name}
                        href={`/user/${componentProps.user.name}`}
                    />
                    <SearchFeed
                        text={componentProps.text}
                        user={componentProps.user.id}
                    />
                </>
                :
                <Error/>
            }
        </>
    );
};

export const getServerSideProps: GetServerSideProps<NextProps<Props>> = async ({ query }) => {
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