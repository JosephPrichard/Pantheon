/*
 * Copyright (c) Joseph Prichard 2022.
 */

import type { NextPage } from "next";
import React from "react";
import Banner from "../src/components/Banner/Banner";
import ErrorPage from "../src/components/ErrorPage/ErrorPage";
import GlobalFeed from "../src/components/Feed/PostFeeds/CategoryPostFeed/GlobalFeed/GlobalFeed";
import { Next } from "../src/utils/next";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";

interface Props {
    after: number;
    before: number;
}

const FeedPage: NextPage<Next<Props>> = ({ componentProps }: Next<Props>) => {
    return (
        <>
            <NextSeo title="Pantheon"/>
            {componentProps ? 
                <>
                    <Banner/>
                    <GlobalFeed
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
