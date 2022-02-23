import type { NextPage } from "next";
import React from "react";
import Banner from "../src/components/Banner/Banner";
import ErrorPage from "../src/components/ErrorPage/ErrorPage";
import HomeFeed from "../src/components/Feed/PostFeed/HomeFeed/HomeFeed";
import PopularFeed from "../src/components/Feed/PostFeed/PopularFeed/PopularFeed";
import { SortType, TimeType } from "../src/global";
import { useUserName } from "../src/hooks/useUserCreds";
import { PageProps } from "../src/utils/next/PageProps";
import { getServerSidePropsWithSlug } from "../src/utils/next/postFeedServerSideProps";

interface Props {
    sort: SortType;
    time: TimeType;
    page: number;
}

const FeedPage: NextPage<PageProps<Props>> = ({ componentProps }: PageProps<Props>) => {

    const name = useUserName();

    return (
        <>
            {componentProps ? 
                <>
                    <Banner/>
                    {name ?
                        <HomeFeed 
                            sort={componentProps.sort} 
                            time={componentProps.time}
                            page={componentProps.page}
                        />
                        :
                        <PopularFeed 
                            sort={componentProps.sort} 
                            time={componentProps.time}
                            page={componentProps.page}
                        />
                    }
                </>
                :
                <ErrorPage/>
            }
        </>
    );
};

export const getServerSideProps = getServerSidePropsWithSlug;

export default FeedPage;
