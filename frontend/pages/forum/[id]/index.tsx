/*
 * Copyright (c) Joseph Prichard 2022.
 */

import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import { configNoCreds } from "../../../src/client/config";
import { ForumEntity } from "../../../src/client/models/forum";
import TopBanner from "../../../src/components/Banner/TopBanner/TopBanner";
import Error from "../../../src/components/Error/Error";
import ForumFeed from "../../../src/components/Feed/PostFeeds/CategoryPostFeed/ForumFeed/ForumFeed";
import { NextProps } from "../../../src/utils/next";
import { NextSeo } from "next-seo";
import React from "react";

interface Props {
    forum: ForumEntity;
    after: number;
    before: number;
}

const ForumPage: NextPage<NextProps<Props>> = ({ componentProps }: NextProps<Props>) => (
    <>
        <NextSeo title={`Forum: ${componentProps?.forum.id}`}/>
        {componentProps ?
            <>
                <TopBanner
                    title={componentProps.forum.id}
                    href={`/forum/${componentProps.forum.id}`}
                />
                <ForumFeed 
                    forum={componentProps.forum}
                    afterCursor={componentProps.after}
                    beforeCursor={componentProps.before}
                />
            </>
            :
            <Error/>
        }
    </>
);

interface ForumRes {
    forum: ForumEntity;
}

async function fetchForumById(id: string) {
    return await axios.get<ForumRes>(`/api/forums/${id}`, configNoCreds);
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const after = Number(query.after);
    const before = Number(query.before);

    const forumId = query.id as string | undefined;
    if (!forumId) {
        return {
            props: {}
        };
    }
    
    try {
        const res = await fetchForumById(forumId);
        const forum = res.data.forum;
        return {
            props: {
                componentProps: {
                    forum,
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

export default ForumPage;