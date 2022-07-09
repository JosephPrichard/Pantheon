/*
 * Copyright (c) Joseph Prichard 2022.
 */

import type { GetServerSideProps, NextPage } from "next";
import Banner from "../../../src/components/Banner/Banner";
import React from "react";
import axios from "axios";
import { UserEntity } from "../../../src/client/models/user";
import { configNoCreds } from "../../../src/client/config";
import { Next } from "../../../src/utils/next";
import ErrorPage from "../../../src/components/ErrorPage/ErrorPage";
import UserFeed from "../../../src/components/Feed/PostFeeds/CategoryPostFeed/UserFeed.tsx/UserFeed";
import { fetchUserByName } from "../../../src/client/api/user";
import { NextSeo } from "next-seo";

interface Props {
    user: UserEntity;
    after: number;
    before: number;
}

const UserPage: NextPage<Next<Props>> = ({ componentProps }: Next<Props>) => (
    <>
        <NextSeo title={`User: ${componentProps?.user.name}`}/>
        {componentProps ? 
            <>
                <Banner
                    title={componentProps.user.name}
                    href={`/user/${componentProps.user.name}`}
                />
                <UserFeed
                    user={componentProps.user}
                    afterCursor={componentProps.after}
                    beforeCursor={componentProps.before}
                />
            </>
            :
            <ErrorPage/>
        }
        
    </>
);

export const getServerSideProps: GetServerSideProps<Next<Props>> = async ({ query }) => {
    const after = Number(query.after);
    const before = Number(query.before);

    const name = query.name as string | undefined;
    if (!name) {
        return {
            props: {}
        };
    }
    
    try {
        const res = await fetchUserByName(name);
        const user = res.data.user;
        return {
            props: {
                componentProps: {
                    user,
                    after,
                    before
                }
            }
        };
    } catch(err) {
        return {
            props: {}
        };
    }
};

export default UserPage;
