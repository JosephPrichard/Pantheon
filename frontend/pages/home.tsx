/*
 * Copyright (c) Joseph Prichard 2022.
 */

import type { GetServerSideProps, NextPage } from "next";
import React from "react";
import Banner from "../src/components/Banner/Banner";
import { Next } from "../src/utils/next";
import ErrorPage from "../src/components/ErrorPage/ErrorPage";
import HomeFeed from "../src/components/Feed/PostFeeds/CategoryPostFeed/HomeFeed/HomeFeed";
import { NextSeo } from "next-seo";

interface Props {
    after: number;
    before: number;
}

const FeedPage: NextPage<Next<Props>> = ({ componentProps }: Next<Props>) => {
    return (
        <>
            <NextSeo title="Pantheon Home"/>
            {componentProps ?
                <>
                    <Banner/>
                    <HomeFeed
                        afterCursor={componentProps.after}
                        beforeCursor={componentProps.before}
                    />
                </>
                :
                <ErrorPage/>
            } 
        </>
    );
};

export const getServerSideProps: GetServerSideProps<Next<Props>> = async ({ query }) => {
    const after = Number(query.after);
    const before = Number(query.before);

    return {
        props: {
            componentProps: {
                after,
                before
            }
        }
    };
};

export default FeedPage;