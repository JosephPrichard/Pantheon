/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { NextPage } from "next";
import Banner from "../src/components/Banner/Banner";
import React from "react";
import ForumList from "../src/components/Forum/ForumList/ForumList";
import { Head } from "next/document";
import { NextSeo } from "next-seo";

const ForumPage: NextPage = () => {
    return (
        <>
            <NextSeo title="Pantheon Forums"/>
            <Banner/>
            <ForumList/>
        </>
    );
};

export default ForumPage;