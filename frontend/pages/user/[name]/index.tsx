/*
 * Copyright (c) Joseph Prichard 2022.
 */

import type { GetServerSideProps, NextPage } from "next";
import TopBanner from "../../../src/components/Banner/TopBanner/TopBanner";
import React from "react";
import axios from "axios";
import { UserEntity } from "../../../src/client/models/user";
import { configNoCreds } from "../../../src/client/config";
import { NextProps } from "../../../src/utils/next";
import Error from "../../../src/components/Error/Error";
import UserFeed from "../../../src/components/Feed/PostFeeds/CategoryPostFeed/UserFeed.tsx/UserFeed";
import { fetchUserByName } from "../../../src/client/api/user";
import { NextSeo } from "next-seo";
import ActivityFeed from "../../../src/components/Feed/ActivityFeed/ActivityFeed";

interface Props {
    user: UserEntity;
}

const UserPage: NextPage<NextProps<Props>> = ({ componentProps }: NextProps<Props>) => (
    <>
        <NextSeo title={`User: ${componentProps?.user.name}`}/>
        {componentProps ? 
            <>
                <TopBanner
                    title={componentProps.user.name}
                    href={`/user/${componentProps.user.name}`}
                />
                <ActivityFeed user={componentProps.user} />
            </>
            :
            <Error/>
        }
        
    </>
);

export const getServerSideProps: GetServerSideProps<NextProps<Props>> = async ({ query }) => {
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
                    user
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
