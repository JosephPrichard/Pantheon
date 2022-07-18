/*
 * Copyright (c) Joseph Prichard 2022.
 */

import type { NextPage } from "next";
import React from "react";
import TopBanner from "../src/components/Banner/TopBanner/TopBanner";
import AuthPanel from "../src/components/Auth/AuthPanel/AuthPanel";
import AbsoluteCenter from "../src/components/Util/Layout/AbsoluteCenter/AbsoluteCenter";
import { NextSeo } from "next-seo";

const LoginPage: NextPage = () => {
    return (
        <>
            <NextSeo title="Login"/>
            <TopBanner />
            <AbsoluteCenter>
                <AuthPanel />
            </AbsoluteCenter>
        </>
    );
};

export default LoginPage;
