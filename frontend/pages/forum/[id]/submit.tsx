/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Space } from "@mantine/core";
import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import React from "react";
import { configNoCreds } from "../../../src/client/config";
import { ForumEntity } from "../../../src/client/models/forum";
import TopBanner from "../../../src/components/Banner/TopBanner/TopBanner";
import Error from "../../../src/components/Error/Error";
import ForumPanel from "../../../src/components/Forum/ForumPanel/ForumPanel";
import Submit from "../../../src/components/Submit/Submit";
import DoubleColumn from "../../../src/components/Util/Layout/DoubleColumn/DoubleColumn";
import { NextProps } from "../../../src/utils/next";
import { fetchForumById } from "../../../src/client/api/forum";
import { NextSeo } from "next-seo";

interface Props {
    forum: ForumEntity;
}

const SubmitPage: NextPage<NextProps<Props>> = ({ componentProps }: NextProps<Props>) => {
    return (
        <>
            <NextSeo title={`Submit to ${componentProps?.forum.id}`}/>
            {componentProps ?
                <>
                    <TopBanner
                        title={componentProps.forum.id}
                        href={`/forum/${componentProps.forum.id}`}
                    />
                    <Space h={40}/>
                    <DoubleColumn
                        column1={<Submit forum={componentProps.forum}/>}
                        column1Width={"56%"}
                        column1Margin={"12%"}
                        column2={<ForumPanel forum={componentProps.forum}/>}
                        column2Width={"20%"}
                        column2Margin={"12%"}
                        marginBottom={20}
                    />
                </>
                :
                <Error/>
            }
        </>
    );
};

export const getServerSideProps: GetServerSideProps<NextProps<Props>> = async ({ query }) => {
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
