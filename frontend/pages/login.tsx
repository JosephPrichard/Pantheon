import type { NextPage } from "next";
import React from "react";
import Banner from "../components/Banner/Banner";
import Login from "../components/Login/Login";
import AbsoluteCenter from "../components/Util/Layout/AbsoluteCenter/AbsoluteCenter";

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
