/*
 * Copyright (c) Joseph Prichard 2022.
 */

import type { GetServerSideProps, NextPage } from "next";
import React from "react";
import Banner from "../src/components/Banner/Banner";
import { PageProps } from "../src/utils/next/PageProps";
import ErrorPage from "../src/components/ErrorPage/ErrorPage";
import HomeFeed from "../src/components/Feed/PostFeeds/CategoryPostFeed/HomeFeed/HomeFeed";

interface Props {
    after: number;
    before: number;
}

const FeedPage: NextPage<PageProps<Props>> = ({ componentProps }: PageProps<Props>) => {

    return (
        <>
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

export const getServerSideProps: GetServerSideProps<PageProps<Props>> = async ({ query }) => {
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