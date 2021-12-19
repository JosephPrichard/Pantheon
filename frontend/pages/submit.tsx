import type { NextPage } from "next";
import React from "react";
import Banner from "../components/Banner/Banner";
import SubmitPost from "../components/Submit/Submit";
import Body from "../components/Util/Layout/Body/Body";

const SubmitPage: NextPage = () => {
    return (
        <>
            <Banner />
            <Body width="50%" minWidth={700}>
                <SubmitPost/>
            </Body>
        </>
    );
};

export default SubmitPage;
