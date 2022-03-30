/*
 * Copyright (c) Joseph Prichard 2022.
 */

import type { GetServerSideProps, NextPage } from "next";
import React from "react";
import Banner from "../../src/components/Banner/Banner";
import PopularFeed from "../../src/components/Feed/PostFeed/PopularFeed/PopularFeed";
import { SortType, TimeType } from "../../src/global";
import { PageProps } from "../../src/utils/next/PageProps";
import { getServerSidePropsWithSlug } from "../../src/utils/next/postFeedServerSideProps";
import ErrorPage from "../../src/components/ErrorPage/ErrorPage";

interface Props {
    sort: SortType;
    time: TimeType;
    page: number;
}

const FeedPage: NextPage<PageProps<Props>> = ({ componentProps }: PageProps<Props>) => {
    return (
        <>
            {componentProps ? 
                <>
                    <Banner/>
                    <PopularFeed 
                        sort={componentProps.sort} 
                        time={componentProps.time}
                        page={componentProps.page}
                        routeToPopular
                    />
                </>
                :
                <ErrorPage/>
            } 
        </>
    );
};

export const getServerSideProps: GetServerSideProps = getServerSidePropsWithSlug;

export default FeedPage;