/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { NextPage } from "next";
import ErrorPage from "../src/components/ErrorPage/ErrorPage";
import { NextSeo } from "next-seo";
import React from "react";

const Error404Page: NextPage = () => {
    return (
        <>
            <NextSeo title="Not Found"/>
            <ErrorPage/>
        </>
    );
};

export default Error404Page;