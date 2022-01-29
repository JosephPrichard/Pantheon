import type { NextPage } from "next";
import React from "react";
import Banner from "../src/components/Banner/Banner";
import Login from "../src/components/Login/Login";
import AbsoluteCenter from "../src/components/Util/Layout/AbsoluteCenter/AbsoluteCenter";

const LoginPage: NextPage = () => {
    return (
        <>
            <Banner />
            <AbsoluteCenter>
                <Login />
            </AbsoluteCenter>
        </>
    );
};

export default LoginPage;
