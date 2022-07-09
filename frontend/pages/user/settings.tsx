/*
 * Copyright (c) Joseph Prichard 2022.
 */

import React from "react";
import UserProfile from "../../src/components/User/UserProfile/UserProfile";
import Banner from "../../src/components/Banner/Banner";
import SingleColumn from "../../src/components/Util/Layout/SingleColumn/SingleColumn";
import { NextSeo } from "next-seo";

const ProfilePage = () => {
    return (
        <>
            <NextSeo title="Pantheon Settings"/>
            <Banner/>
            <SingleColumn
                column={<UserProfile/>}
                columnWidth="60%"
                columnMargin="20%"
            />
        </>
    );
}

export default ProfilePage;