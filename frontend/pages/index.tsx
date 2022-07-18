/*
 * Copyright (c) Joseph Prichard 2022.
 */

import type { NextPage } from "next";
import React from "react";
import TopBanner from "../src/components/Banner/TopBanner/TopBanner";
import Error from "../src/components/Error/Error";
import GlobalFeed from "../src/components/Feed/PostFeeds/CategoryPostFeed/GlobalFeed/GlobalFeed";
import { NextProps } from "../src/utils/next";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import BottomBanner from "../src/components/Banner/BottomBanner/BottomBanner";

interface Props {
    after: number;
    before: number;
}

const FeedPage: NextPage<NextProps<Props>> = ({ componentProps }: NextProps<Props>) => {
    return (
        <>
            <NextSeo title="Pantheon"/>
            {componentProps ? 
                <>
                    <TopBanner/>
                    <GlobalFeed
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
