/*
 * Copyright (c) Joseph Prichard 2022.
 */

import type { GetServerSideProps, NextPage } from "next";
import Banner from "../../../src/components/Banner/Banner";
import React from "react";
import axios from "axios";
import { UserEntity } from "../../../src/client/models/user";
import { configNoCreds } from "../../../src/client/config";
import { PageProps } from "../../../src/utils/next/PageProps";
import ErrorPage from "../../../src/components/ErrorPage/ErrorPage";
import UserFeed from "../../../src/components/Feed/PostFeeds/CategoryPostFeed/UserFeed.tsx/UserFeed";

interface Props {
    user: UserEntity;
    after: number;
    before: number;
}

const UserPage: NextPage<PageProps<Props>> = ({ componentProps }: PageProps<Props>) => (
    <>
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

interface UserRes {
    user: UserEntity;
}

async function fetchUserByName(name: string) {
    return await axios.get<UserRes>(`/api/users?name=${name}`, configNoCreds);
}

export const getServerSideProps: GetServerSideProps<PageProps<Props>> = async ({ query }) => {
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
