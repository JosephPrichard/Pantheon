/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { NextPage } from "next";
import Error from "../src/components/Error/Error";
import { NextSeo } from "next-seo";
import React from "react";

const Error404Page: NextPage = () => {
    return (
        <>
            <NextSeo title="Not Found"/>
            <Error/>
        </>
    );
};

export default Error404Page;