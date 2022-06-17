/*
 * Copyright (c) Joseph Prichard 2022.
 */

import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import { configNoCreds } from "../../../src/client/config";
import { ForumEntity } from "../../../src/client/models/forum";
import Banner from "../../../src/components/Banner/Banner";
import ErrorPage from "../../../src/components/ErrorPage/ErrorPage";
import ForumFeed from "../../../src/components/Feed/PostFeeds/CategoryPostFeed/ForumFeed/ForumFeed";
import { PageProps } from "../../../src/utils/next/PageProps";

interface Props {
    forum: ForumEntity;
    after: number;
    before: number;
}

const ForumPage: NextPage<PageProps<Props>> = ({ componentProps }: PageProps<Props>) => (
    <>
        {componentProps ?
            <>
                <Banner
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
            <ErrorPage/>
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