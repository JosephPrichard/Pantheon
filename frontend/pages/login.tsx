/*
 * Copyright (c) Joseph Prichard 2022.
 */

import type { NextPage } from "next";
import React from "react";
import Banner from "../src/components/Banner/Banner";
import Login from "../src/components/Login/Login";
import AbsoluteCenter from "../src/components/Util/Layout/AbsoluteCenter/AbsoluteCenter";
import { NextSeo } from "next-seo";

const LoginPage: NextPage = () => {
    return (
        <>
            <NextSeo title="Login"/>
            <Banner />
            <AbsoluteCenter>
                <Login />
            </AbsoluteCenter>
        </>
    );
};

export default LoginPage;
