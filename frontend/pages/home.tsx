/*
 * Copyright (c) Joseph Prichard 2022.
 */

import type { GetServerSideProps, NextPage } from "next";
import React from "react";
import TopBanner from "../src/components/Banner/TopBanner/TopBanner";
import { NextProps } from "../src/utils/next";
import Error from "../src/components/Error/Error";
import HomeFeed from "../src/components/Feed/PostFeeds/CategoryPostFeed/HomeFeed/HomeFeed";
import { NextSeo } from "next-seo";

interface Props {
    after: number;
    before: number;
}

const FeedPage: NextPage<NextProps<Props>> = ({ componentProps }: NextProps<Props>) => {
    return (
        <>
            <NextSeo title="Pantheon Home"/>
            {componentProps ?
                <>
                    <TopBanner/>
                    <HomeFeed
                        afterCursor={componentProps.after}
                        beforeCursor={componentProps.before}
                    />
                </>
                :
                <Error/>
            } 
        </>
    );
};

export const getServerSideProps: GetServerSideProps<NextProps<Props>> = async ({ query }) => {
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