/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { NextPage } from "next";
import TopBanner from "../src/components/Banner/TopBanner/TopBanner";
import React from "react";
import ForumList from "../src/components/Forum/ForumList/ForumList";
import { Head } from "next/document";
import { NextSeo } from "next-seo";

const ForumPage: NextPage = () => {
    return (
        <>
            <NextSeo title="Pantheon Forums"/>
            <TopBanner/>
            <ForumList/>
        </>
    );
};

export default ForumPage;