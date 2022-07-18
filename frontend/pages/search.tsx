/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { GetServerSideProps, NextPage } from "next";
import { NextProps } from "../src/utils/next";
import Error from "../src/components/Error/Error";
import React from "react";
import TopBanner from "../src/components/Banner/TopBanner/TopBanner";
import SearchFeed from "../src/components/Feed/PostFeeds/CategoryPostFeed/SearchFeed/SearchFeed";
import { NextSeo } from "next-seo";

interface Props {
    text: string;
    page: number;
}

const SearchPage: NextPage<NextProps<Props>> = ({ componentProps }: NextProps<Props>) => {
    return (
        <>
            <NextSeo title={`Search Results: ${componentProps?.text}`}/>
            {componentProps ?
                <>
                    <TopBanner/>
                    <SearchFeed text={componentProps.text} />
                </>
                :
                <Error/>
            }
        </>
    );
};

export const getServerSideProps: GetServerSideProps<NextProps<Props>> = async ({ query }) => {
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

    return {
        props: {
            componentProps: {
                text,
                page
            }
        }
    }

}

export default SearchPage;