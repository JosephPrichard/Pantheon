/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { NextPage } from "next";
import Banner from "../src/components/Banner/Banner";
import React from "react";
import ForumList from "../src/components/Forum/ForumList/ForumList";
import { Head } from "next/document";

const ForumPage: NextPage = () => {

    return (
        <>
            <Banner/>
            <ForumList/>
        </>
    );
};

export default ForumPage;