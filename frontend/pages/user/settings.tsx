/*
 * Copyright (c) Joseph Prichard 2022.
 */

import React from "react";
import UserProfile from "../../src/components/User/UserProfile/UserProfile";
import TopBanner from "../../src/components/Banner/TopBanner/TopBanner";
import SingleColumn from "../../src/components/Util/Layout/SingleColumn/SingleColumn";
import { NextSeo } from "next-seo";

const ProfilePage = () => {
    return (
        <>
            <NextSeo title="Pantheon Settings"/>
            <TopBanner/>
            <SingleColumn column={<UserProfile/>} />
        </>
    );
}

export default ProfilePage;