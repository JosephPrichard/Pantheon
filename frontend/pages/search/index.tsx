/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { GetServerSideProps, NextPage } from "next";
import { PageProps } from "../../src/utils/next/PageProps";
import ErrorPage from "../../src/components/ErrorPage/ErrorPage";
import React from "react";
import Banner from "../../src/components/Banner/Banner";
import SearchAllFeed from "../../src/components/Feed/PostFeed/SearchFeed/SearchAllFeed/SearchAllFeed";

interface Props {
    text: string;
    page: number;
}

const SearchPage: NextPage<PageProps<Props>> = ({ componentProps }: PageProps<Props>) => {
    return (
        <>
            {componentProps ?
                <>
                    <Banner/>
                    <SearchAllFeed
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

export const getServerSideProps: GetServerSideProps<PageProps<Props>> = async ({ query }) => {
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