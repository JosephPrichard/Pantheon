import type { GetServerSideProps, NextPage } from "next";
import React, { Props, useEffect, useState } from "react";
import Banner from "../src/components/Banner/Banner";
import { getUser } from "../src/user";
import ErrorPage from "../src/components/ErrorPage/ErrorPage";
import HomeFeed from "../src/components/Feed/PostFeed/HomeFeed/HomeFeed";
import PopularFeed from "../src/components/Feed/PostFeed/PopularFeed/PopularFeed";
import { PageProps } from "../src/utils/next/PageProps";
import { getServerSidePropsWithSlug, PostFeedProps } from "../src/utils/next/postFeedServerSideProps";

const FeedPage: NextPage<PageProps<PostFeedProps>> = ({ componentProps }: PageProps<PostFeedProps>) => {
    const [name, setName] = useState<string>();

    useEffect(() => {
        const cookieData = getUser();
        setName(cookieData?.name);
    });

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
