/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Space } from "@mantine/core";
import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import React from "react";
import { configNoCreds } from "../../../src/client/config";
import { ForumEntity } from "../../../src/client/models/forum";
import Banner from "../../../src/components/Banner/Banner";
import ErrorPage from "../../../src/components/ErrorPage/ErrorPage";
import ForumPanel from "../../../src/components/Forum/ForumPanel/ForumPanel";
import Submit from "../../../src/components/Submit/Submit";
import DoubleColumn from "../../../src/components/Util/Layout/DoubleColumn/DoubleColumn";
import { PageProps } from "../../../src/utils/next/PageProps";

interface Props {
    forum: ForumEntity;
}

const SubmitPage: NextPage<PageProps<Props>> = ({ componentProps }: PageProps<Props>) => {
    return (
        <>
            {componentProps ?
                <>
                    <Banner
                        title={componentProps.forum.id}
                        href={`/forum/${componentProps.forum.id}`}
                    />
                    <Space h={40}/>
                    <DoubleColumn
                        column1={<Submit initialForum={componentProps.forum}/>}
                        column1Width={"56%"}
                        column1Margin={"12%"}
                        column2={<ForumPanel forum={componentProps.forum}/>}
                        column2Width={"20%"}
                        column2Margin={"12%"}
                        marginBottom={20}
                    />
                </>
                :
                <ErrorPage/>
            }
        </>
    );
};

interface ForumRes {
    forum: ForumEntity;
}

async function fetchForumById(id: string) {
    return await axios.get<ForumRes>(`/api/forums/${id}`, configNoCreds);
}

export const getServerSideProps: GetServerSideProps<PageProps<Props>> = async ({ query }) => {
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
                    forum
                }
            }
        };
    } catch(err) {
        return {
            props: {}
        };
    }
}

export default SubmitPage;
